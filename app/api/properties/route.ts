import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/server";
import { createProperty, getPublishedProperties, getAllProperties } from "@/lib/data/properties";

export async function GET(req: NextRequest) {
  const session = await getSession();
  const props = session ? await getAllProperties() : await getPublishedProperties();
  return NextResponse.json(props);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const body = await req.json();
  const { images, ...propertyData } = body;
  const property = await createProperty(propertyData);

  if (images?.length) {
    const { setPropertyImages } = await import("@/lib/data/properties");
    await setPropertyImages(property.id, images);
  }

  return NextResponse.json(property, { status: 201 });
}
