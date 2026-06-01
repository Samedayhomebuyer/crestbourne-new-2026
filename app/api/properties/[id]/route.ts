import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/server";
import {
  getPropertyById,
  updateProperty,
  deleteProperty,
  setPropertyImages,
} from "@/lib/data/properties";

type Ctx = { params: { id: string } };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const property = await getPropertyById(params.id);
  if (!property) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(property);
}

export async function PATCH(req: NextRequest, { params }: Ctx) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const { images, ...data } = await req.json();

  if (!data.title?.trim() || !data.slug?.trim() || !data.location?.trim()) {
    return NextResponse.json(
      { error: "Title, slug, and location are required" },
      { status: 400 }
    );
  }

  const updated = await updateProperty(params.id, data);
  if (images !== undefined) await setPropertyImages(params.id, images);

  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  await deleteProperty(params.id);
  return new NextResponse(null, { status: 204 });
}
