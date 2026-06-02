import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/server";
import { removeSubscriber, toggleSubscriber } from "@/lib/data/subscribers";

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await removeSubscriber(params.id);
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { subscribed } = await req.json();
  const row = await toggleSubscriber(params.id, Boolean(subscribed));
  return NextResponse.json(row);
}
