import { getPluginBySlug, getAllPlugins } from "@/lib/plugins";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, User, Package, Tag, Calendar, Hash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { MarkdownContent } from "@/components/markdown-content";

export async function generateStaticParams() {
  const plugins = getAllPlugins();
  return plugins.map((plugin) => ({
    slug: plugin.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plugin = getPluginBySlug(slug);
  if (!plugin) return {};
  return {
    title: `${plugin.name} | JWPlaceholderAPI`,
    description: plugin.description,
  };
}

export default async function PluginPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plugin = getPluginBySlug(slug);

  if (!plugin) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/"
        className="animate-fade-in mb-6 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Plugins
      </Link>

      <div className="animate-slide-up mb-8 rounded-lg border bg-card p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
            <Package className="h-6 w-6 text-blue-500" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold tracking-tight">
              {plugin.name}
            </h1>
            <p className="mt-1 text-muted-foreground">{plugin.description}</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                <span className="font-medium text-foreground">{plugin.author}</span>
              </span>
              {plugin.version && (
                <span className="flex items-center gap-1.5">
                  <Tag className="h-4 w-4" />
                  <span>v{plugin.version}</span>
                </span>
              )}
              {plugin.updated && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>{plugin.updated}</span>
                </span>
              )}
              {plugin.placeholders && (
                <span className="flex items-center gap-1.5">
                  <Hash className="h-4 w-4" />
                  <span>{plugin.placeholders} placeholders</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <Separator className="mb-8" />

      <div className="animate-slide-up animate-delay-200">
        <MarkdownContent content={plugin.content} />
      </div>
    </div>
  );
}
