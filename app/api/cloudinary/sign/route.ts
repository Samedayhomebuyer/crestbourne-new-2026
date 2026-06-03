import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  const secret = process.env.CLOUDINARY_API_SECRET;
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;

  if (!secret || !cloudName || !apiKey) {
    return NextResponse.json(
      { error: `Missing env vars: ${[!secret && "CLOUDINARY_API_SECRET", !cloudName && "CLOUDINARY_CLOUD_NAME", !apiKey && "CLOUDINARY_API_KEY"].filter(Boolean).join(", ")}` },
      { status: 500 }
    );
  }

  const { folder = "crestbourne/properties" } = await req.json();

  const timestamp = Math.round(Date.now() / 1000);
  const paramsToSign = { timestamp, folder };

  const signature = cloudinary.utils.api_sign_request(paramsToSign, secret);

  return NextResponse.json({ signature, timestamp, folder, cloudName, apiKey });
}
