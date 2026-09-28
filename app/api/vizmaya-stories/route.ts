import { NextResponse } from "next/server"
import { getVizmayaStoryCount } from "@/lib/vizmaya"

export const revalidate = 3600

export async function GET() {
  return NextResponse.json({ count: await getVizmayaStoryCount() })
}
