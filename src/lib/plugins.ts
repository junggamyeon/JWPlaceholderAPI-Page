import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface PluginData {
  slug: string;
  name: string;
  author: string;
  description: string;
  version?: string;
  updated?: string;
  placeholders?: number;
  content: string;
}

const pluginsDirectory = path.join(process.cwd(), 'content/plugins');

export function getAllPlugins(): PluginData[] {
  if (!fs.existsSync(pluginsDirectory)) {
    fs.mkdirSync(pluginsDirectory, { recursive: true });
    return [];
  }

  const fileNames = fs.readdirSync(pluginsDirectory);
  const allPluginsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(pluginsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const matterResult = matter(fileContents);

      return {
        slug,
        name: matterResult.data.name || slug,
        author: matterResult.data.author || 'Unknown',
        description: matterResult.data.description || '',
        version: matterResult.data.version || undefined,
        updated: matterResult.data.updated || undefined,
        placeholders: matterResult.data.placeholders || undefined,
        content: matterResult.content,
      };
    });

  return allPluginsData.sort((a, b) => (a.name < b.name ? -1 : 1));
}

export function getPluginBySlug(slug: string): PluginData | null {
  const fullPath = path.join(pluginsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    slug,
    name: matterResult.data.name || slug,
    author: matterResult.data.author || 'Unknown',
    description: matterResult.data.description || '',
    content: matterResult.content,
  };
}
