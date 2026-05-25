import { getAllPlugins } from "@/lib/plugins";
import PluginSearch from "@/components/PluginSearch";
import { Package } from "lucide-react";

export default function Home() {
  const plugins = getAllPlugins();

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold tracking-tight">Expansions</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Browse supported plugins and their placeholders for JWPlaceholderAPI.
        </p>
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Package className="h-3.5 w-3.5" />
          <span>{plugins.length} plugins available</span>
        </div>
      </div>
      <div className="animate-slide-up animate-delay-100">
        <PluginSearch initialPlugins={plugins} />
      </div>
    </div>
  );
}
