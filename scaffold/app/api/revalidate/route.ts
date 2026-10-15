import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    revalidatePath("/", "layout");
    revalidatePath("/projects", "layout");
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err: any) {
    return NextResponse.json({ revalidated: false, error: err?.message }, { status: 500 });
  }
}

export async function GET() {
  return POST();
}
