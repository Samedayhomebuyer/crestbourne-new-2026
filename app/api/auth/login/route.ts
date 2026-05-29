import { NextRequest, NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "crypto";
import { createSession } from "@/lib/auth/server";

function sha256(s: string) {
  return createHash("sha256").update(s).digest("hex");
}

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const expectedHash = process.env.ADMIN_PASSWORD_HASH ?? "";
  const actualHash = sha256(password ?? "");
  const emailMatch = email === process.env.ADMIN_EMAIL;
  const hashMatch = expectedHash.length > 0 && timingSafeEqual(
    Buffer.from(actualHash),
    Buffer.from(expectedHash)
  );

  if (!emailMatch || !hashMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  await createSession(email);
  return NextResponse.json({ ok: true });
}
