"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Package, ChevronRight } from "lucide-react";
import { PluginData } from "@/lib/plugins";

export default function PluginSearch({ initialPlugins }: { initialPlugins: PluginData[] }) {
  const [search, setSearch] = useState("");

  const filteredPlugins = initialPlugins.filter(
    (plugin) =>
      plugin.name.toLowerCase().includes(search.toLowerCase()) ||
      plugin.description.toLowerCase().includes(search.toLowerCase()) ||
      plugin.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="text-[#94a3b8]" size={20} />
        </div>
        <input
          type="text"
          placeholder="Search for a plugin or placeholder..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-[#0a0f1a] border border-[#1e293b] rounded-xl text-white placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all"
        />
      </div>

      {/* Plugin Grid */}
      {filteredPlugins.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlugins.map((plugin) => (
            <Link key={plugin.slug} href={`/plugins/${plugin.slug}`} className="group block h-full">
              <div className="bg-[#0a0f1a] border border-[#1e293b] rounded-xl p-6 h-full flex flex-col hover:border-[#3b82f6] transition-colors relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Package size={64} />
                </div>
                
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-white group-hover:text-[#3b82f6] transition-colors">
                    {plugin.name}
                  </h2>
                </div>
                
                <p className="text-[#94a3b8] text-sm mb-4 flex-1">
                  {plugin.description || "No description provided."}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-[#1e293b] mt-auto">
                  <span className="text-xs text-[#94a3b8]">By <span className="text-gray-300 font-medium">{plugin.author}</span></span>
                  <span className="flex items-center text-xs font-medium text-[#3b82f6]">
                    View Placeholders <ChevronRight size={14} className="ml-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-[#1e293b] rounded-xl bg-[#0a0f1a]/50">
          <Package className="mx-auto text-[#1e293b] mb-4" size={48} />
          <h3 className="text-xl font-semibold text-white mb-2">No plugins found</h3>
          <p className="text-[#94a3b8]">Try adjusting your search query.</p>
        </div>
      )}
    </div>
  );
}
