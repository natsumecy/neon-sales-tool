import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string; file: string }> }
) {
  const { slug, file } = await params;

  // Only allow .css files
  if (!file.endsWith(".css")) {
    return new NextResponse("", { status: 404 });
  }

  // Sanitize to prevent path traversal
  const safeSlug = slug.replace(/[^a-z0-9-]/gi, "");
  const safeFile = file.replace(/[^a-z0-9.-]/gi, "");

  const filePath = path.join(
    process.cwd(),
    "publishers",
    safeSlug,
    safeFile
  );

  if (!fs.existsSync(filePath)) {
    return new NextResponse("", { status: 404 });
  }

  const css = fs.readFileSync(filePath, "utf-8");
  return new NextResponse(css, {
    headers: {
      "Content-Type": "text/css",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}
