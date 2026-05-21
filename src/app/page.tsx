import { getAllPlugins } from "@/lib/plugins";
import PluginSearch from "@/components/PluginSearch";

export default function Home() {
  const plugins = getAllPlugins();

  return (
    <div className="py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Find Placeholders for <br />
          <span className="text-[#3b82f6]">Your Endstone Server</span>
        </h1>
        <p className="text-lg text-[#94a3b8]">
          Browse the official directory of plugins supporting JWPlaceholderAPI. 
          Discover available placeholders to use in your scoreboards, bossbars, and chat formats.
        </p>
      </div>

      <PluginSearch initialPlugins={plugins} />
    </div>
  );
}
