import { NextResponse } from "next/server";
import { deleteSession } from "@/lib/auth/server";

export async function POST() {
  await deleteSession();
  return NextResponse.redirect(new URL("/admin/login", process.env.NEXT_PUBLIC_APP_URL!));
}
