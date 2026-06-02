import { Resend } from 'resend';
import type { Contact } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const SEGMENT_ID = process.env.RESEND_SEGMENT_ID ?? '';

export type SubscriberView = {
  id: string;
  name: string;
  email: string;
  subscribed: boolean;
  createdAt: string;
};

function contactToView(c: Contact): SubscriberView {
  return {
    id: c.id,
    email: c.email,
    name: [c.first_name, c.last_name].filter(Boolean).join(' ') || c.email,
    subscribed: !c.unsubscribed,
    createdAt: c.created_at,
  };
}

export async function getAllSubscribers(): Promise<SubscriberView[]> {
  const opts = SEGMENT_ID ? { segmentId: SEGMENT_ID } : {};
  const { data, error } = await resend.contacts.list(opts);
  if (error) throw new Error(`Resend contacts.list failed: ${error.message ?? JSON.stringify(error)}`);
  if (!data) return [];
  return data.data.map(contactToView);
}

export async function getActiveSubscribers(): Promise<SubscriberView[]> {
  const all = await getAllSubscribers();
  return all.filter((s) => s.subscribed);
}

export async function addSubscriber(input: { name: string; email: string }): Promise<SubscriberView> {
  const { data, error } = await resend.contacts.create({
    email: input.email,
    firstName: input.name,
    unsubscribed: false,
    ...(SEGMENT_ID ? { segments: [{ id: SEGMENT_ID }] } : {}),
  });
  if (error || !data) throw new Error(error?.message ?? 'Failed to create contact');
  return {
    id: data.id,
    name: input.name,
    email: input.email,
    subscribed: true,
    createdAt: new Date().toISOString(),
  };
}

export async function removeSubscriber(id: string): Promise<void> {
  await resend.contacts.remove({ id });
}

export async function toggleSubscriber(id: string, subscribed: boolean): Promise<SubscriberView> {
  const { error } = await resend.contacts.update({ id, unsubscribed: !subscribed });
  if (error) throw new Error(error.message ?? 'Failed to update contact');
  const { data: contact } = await resend.contacts.get(id);
  if (!contact) throw new Error('Contact not found');
  return contactToView(contact as Contact);
}
