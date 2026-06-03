import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { createSession } from "@/lib/auth/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const hash = Buffer.from(process.env.ADMIN_PASSWORD_HASH ?? "", "base64").toString();
  const emailMatch = email === process.env.ADMIN_EMAIL;
  const passwordMatch = hash.length > 0 && await compare(password ?? "", hash);

  if (!emailMatch || !passwordMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  await createSession(email);
  return NextResponse.json({ ok: true });
}
