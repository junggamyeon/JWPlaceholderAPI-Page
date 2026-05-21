import { getPluginBySlug, getAllPlugins } from "@/lib/plugins";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { ChevronLeft, User, Package } from "lucide-react";

export async function generateStaticParams() {
  const plugins = getAllPlugins();
  return plugins.map((plugin) => ({
    slug: plugin.slug,
  }));
}

export default async function PluginPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const plugin = getPluginBySlug(slug);

  if (!plugin) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Breadcrumb */}
      <Link href="/" className="inline-flex items-center text-[#94a3b8] hover:text-[#3b82f6] text-sm font-medium mb-8 transition-colors">
        <ChevronLeft size={16} className="mr-1" /> Back to Plugins
      </Link>

      {/* Header */}
      <div className="bg-[#0a0f1a] border border-[#1e293b] rounded-2xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Package size={120} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 relative z-10">{plugin.name}</h1>
        <p className="text-lg text-[#94a3b8] mb-6 relative z-10 max-w-2xl">{plugin.description}</p>
        
        <div className="flex items-center gap-2 text-sm text-gray-300 bg-black/50 w-fit px-4 py-2 rounded-lg border border-[#1e293b] relative z-10">
          <User size={16} className="text-[#3b82f6]" />
          <span>Author: <strong>{plugin.author}</strong></span>
        </div>
      </div>

      {/* Markdown Content */}
      <div className="bg-[#0a0f1a] border border-[#1e293b] rounded-2xl p-8">
        <article className="prose prose-invert prose-blue max-w-none 
          prose-headings:border-b prose-headings:border-[#1e293b] prose-headings:pb-2
          prose-table:border-collapse prose-table:w-full prose-th:bg-black/50 prose-th:p-4 prose-th:border prose-th:border-[#1e293b] prose-th:text-left
          prose-td:p-4 prose-td:border prose-td:border-[#1e293b]
          prose-code:text-[#60a5fa] prose-code:bg-[#3b82f6]/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
        ">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{plugin.content}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
