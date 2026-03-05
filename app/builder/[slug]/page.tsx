import { notFound } from "next/navigation";
import { getPublisher, getTokens } from "@/lib/publishers";
import { BuilderClient } from "./BuilderClient";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export default async function BuilderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const publisher = getPublisher(slug);
  if (!publisher) notFound();

  const tokens = getTokens(slug);

  // Check asset files
  const imgDir = path.join(process.cwd(), "public", "img", slug);
  const assetsStatus = {
    screenshotLight: fs.existsSync(path.join(imgDir, "screenshot-light.png")),
    screenshotDark: fs.existsSync(path.join(imgDir, "screenshot-dark.png")),
    logo: fs.existsSync(path.join(imgDir, "logo.png")),
  };

  // Load CSS for preview
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

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: lightCSS + "\n" + darkCSS }} />
      <BuilderClient
        publisher={publisher}
        tokens={tokens}
        assetsStatus={assetsStatus}
      />
    </>
  );
}
