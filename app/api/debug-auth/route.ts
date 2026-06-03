import { NextResponse } from "next/server";

export async function GET() {
  const raw = process.env.ADMIN_PASSWORD_HASH ?? "";
  const decoded = Buffer.from(raw, "base64").toString();

  return NextResponse.json({
    emailSet: !!process.env.ADMIN_EMAIL,
    email: process.env.ADMIN_EMAIL,
    hashRawLength: raw.length,
    hashDecodedPrefix: decoded.substring(0, 4), // should be "$2b$"
    hashDecodedLength: decoded.length,
    cookieSecretSet: !!process.env.ADMIN_COOKIE_SECRET,
  });
}
