"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Package, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { PluginData } from "@/lib/plugins";

export default function PluginSearch({
  initialPlugins,
}: {
  initialPlugins: PluginData[];
}) {
  const [search, setSearch] = useState("");

  const filteredPlugins = initialPlugins.filter(
    (plugin) =>
      plugin.name.toLowerCase().includes(search.toLowerCase()) ||
      plugin.description.toLowerCase().includes(search.toLowerCase()) ||
      plugin.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search plugins..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {filteredPlugins.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredPlugins.map((plugin, index) => (
            <Link
              key={plugin.slug}
              href={`/plugins/${plugin.slug}`}
              className="group block animate-slide-up rounded-lg border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500/50 hover:bg-accent hover:shadow-md"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <div className="mb-3 flex items-start justify-between">
                <h2 className="font-semibold transition-colors group-hover:text-blue-500">
                  {plugin.name}
                </h2>
                <Package className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="mb-4 h-10 line-clamp-2 text-sm text-muted-foreground">
                {plugin.description || "No description provided."}
              </p>
              <div className="flex items-center justify-between border-t pt-3 text-xs">
                <span className="text-muted-foreground/70">
                  {plugin.author}
                </span>
                <span className="flex items-center font-medium text-blue-500 transition-transform group-hover:translate-x-0.5">
                  View <ChevronRight className="ml-0.5 h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16">
          <Package className="mb-3 h-10 w-10 text-muted-foreground/50" />
          <h3 className="font-semibold">No plugins found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your search query.
          </p>
        </div>
      )}
    </div>
  );
}
