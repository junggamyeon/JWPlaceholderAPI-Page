"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, Home, FileText, ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import type { PluginData } from "@/lib/plugins";
import { Zap } from "lucide-react";

export function AppSidebar({ plugins }: { plugins: PluginData[] }) {
  const pathname = usePathname();
  const isPluginActive = pathname.startsWith("/plugins");

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-3 py-3">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-500" />
            <p className="text-sm font-bold">JWPlaceholderAPI</p>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Plugin directory &amp; documentation
          </p>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider">
            Getting Started
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"}>
                  <Link href="/">
                    <Home className="h-4 w-4" />
                    <span>Overview</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/docs/writing-plugins"}>
                  <Link href="/docs/writing-plugins">
                    <FileText className="h-4 w-4" />
                    <span>Writing Plugins</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider">
            Plugins
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible defaultOpen={isPluginActive} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <Package className="h-4 w-4" />
                      <span>All Plugins</span>
                      <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {plugins.map((plugin) => {
                        const href = `/plugins/${plugin.slug}`;
                        const isActive = pathname === href;
                        return (
                          <SidebarMenuSubItem key={plugin.slug}>
                            <SidebarMenuSubButton asChild isActive={isActive}>
                              <Link href={href}>
                                <span>{plugin.name}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
