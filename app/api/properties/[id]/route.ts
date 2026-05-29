import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/server";
import { updateProperty, deleteProperty, setPropertyImages } from "@/lib/data/properties";

type Ctx = { params: { id: string } };

export async function PATCH(req: NextRequest, { params }: Ctx) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const { images, ...data } = await req.json();
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
