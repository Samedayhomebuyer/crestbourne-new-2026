import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/server";
import { getAllSubscribers, addSubscriber } from "@/lib/data/subscribers";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await getAllSubscribers();
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const { name, email } = await req.json();
  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  const row = await addSubscriber({ name, email: email.toLowerCase().trim() });
  return NextResponse.json(row, { status: 201 });
}
