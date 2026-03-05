import { notFound } from "next/navigation";
import { getPublisher } from "@/lib/publishers";
import { DemoClient } from "./DemoClient";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export default async function DemoPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ record?: string; password?: string }>;
}) {
  const { slug } = await params;
  const { record, password } = await searchParams;
  const publisher = getPublisher(slug);

  if (!publisher) notFound();

  // Load CSS content directly
  const lightCSSPath = path.join(
    process.cwd(),
    "publishers",
    slug,
    "tokens.light.css"
  );
  const darkCSSPath = path.join(
    process.cwd(),
    "publishers",
    slug,
    "tokens.dark.css"
  );

  const lightCSS = fs.existsSync(lightCSSPath)
    ? fs.readFileSync(lightCSSPath, "utf-8")
    : "";
  const darkCSS = fs.existsSync(darkCSSPath)
    ? fs.readFileSync(darkCSSPath, "utf-8")
    : "";

  const isRecordMode = record === "true";
  const requiresPassword =
    publisher.preview.passwordEnabled && publisher.preview.password;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: lightCSS + "\n" + darkCSS }} />
      <DemoClient
        publisher={publisher}
        isRecordMode={isRecordMode}
        requiresPassword={!!requiresPassword}
        expectedPassword={publisher.preview.password}
        initialPassword={password ?? ""}
      />
    </>
  );
}
