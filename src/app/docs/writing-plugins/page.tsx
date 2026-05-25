import fs from "fs";
import path from "path";
import { MarkdownContent } from "@/components/markdown-content";

export const metadata = {
  title: "Writing Plugins | JWPlaceholderAPI",
  description: "Guide for writing plugin documentation for JWPlaceholderAPI.",
};

export default async function WritingPluginsPage() {
  const filePath = path.join(process.cwd(), "WRITING_PLUGINS.md");
  const content = fs.readFileSync(filePath, "utf8");

  return (
    <div className="mx-auto max-w-4xl animate-fade-in">
      <MarkdownContent content={content} />
    </div>
  );
}
