<div align="center">

# JWPlaceholderAPI Web

The official plugin directory and documentation site for [JWPlaceholderAPI](https://github.com/junggamyeon/JWPlaceholderAPI).

Browse plugins, explore placeholders, and integrate with the Endstone ecosystem.

[Live Site](https://jw-placeholder-page.vercel.app//) · [JWPlaceholderAPI](https://github.com/junggamyeon/JWPlaceholderAPI)

</div>

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Components | shadcn/ui (Radix UI) |
| Icons | Lucide React |
| Content | Markdown + gray-matter |
| Syntax Highlighting | Shiki (github-dark) |
| Typography | @tailwindcss/typography |
| Deployment | Vercel |

## Features

- Documentation-style layout with collapsible nested sidebar
- Markdown-based plugin pages with rich frontmatter metadata
- Syntax-highlighted code blocks with copy-to-clipboard
- Styled tables using shadcn/ui Table components
- Color badge syntax for visual status indicators
- Callout blocks (info, warning, danger, tip)
- Anchor links on headings for deep linking
- Client-side search/filter by name, author, or description
- Responsive design with mobile drawer navigation
- Static site generation for all pages

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/junggamyeon/JWPlaceholderAPI-Page.git
cd JWPlaceholderAPI-Page
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Start (Production)

```bash
npm run start
```

### Lint

```bash
npm run lint
```

## Project Structure

```
content/plugins/          Plugin documentation (Markdown)
src/
├── app/
│   ├── layout.tsx        Root layout (sidebar, header, shell)
│   ├── page.tsx          Homepage (plugin listing + search)
│   ├── docs/
│   │   └── writing-plugins/
│   │       └── page.tsx  Writing guide page
│   └── plugins/
│       └── [slug]/
│           └── page.tsx  Plugin detail page
├── components/
│   ├── header.tsx        Top navigation with social links
│   ├── sidebar.tsx       Nested sidebar navigation
│   ├── copy-button.tsx   Clipboard copy button
│   ├── markdown-content.tsx  Markdown renderer (tables, code, callouts)
│   ├── PluginSearch.tsx  Client-side search + plugin cards
│   └── ui/              shadcn/ui primitives
├── hooks/
│   └── use-mobile.ts    Responsive breakpoint hook
└── lib/
    ├── plugins.ts       Content loader (getAllPlugins, getPluginBySlug)
    └── utils.ts         cn() utility
```

## Adding a Plugin

Create a Markdown file in `content/plugins/`:

```yaml
---
name: YourPlugin
author: YourName
description: Short description of your plugin.
version: 1.0.0
updated: 2025-06-01
placeholders: 12
---
```

Then write your documentation using supported Markdown features:

- **Tables** — rendered as styled shadcn components
- **Code blocks** — syntax highlighted with copy button
- **Color badges** — `` `{green} Active` `` renders as colored badge
- **Callouts** — `:::info`, `:::warning`, `:::danger`, `:::tip`
- **Anchor links** — auto-generated on all headings

See the full [Writing Plugins Guide](https://jw-placeholder-api-page.vercel.app/docs/writing-plugins) for details.

## Markdown Features

### Color Badges

```markdown
`{green} Active`
`{red} Deprecated`
`{yellow} Beta`
`{blue} Dynamic`
```

### Callout Blocks

```markdown
:::info
This is an informational note.
:::

:::warning
This requires special attention.
:::
```

### Code Blocks

All fenced code blocks with a language tag get syntax highlighting and a copy button on hover.

## Contributing

Contributions are welcome. You can contribute by:

- Adding plugin documentation pages
- Improving the site UI/UX
- Fixing bugs or typos
- Enhancing the Markdown renderer

## License

MIT

## Links

- **Website:** https://jw-placeholder-api-page.vercel.app/
- **JWPlaceholderAPI:** https://github.com/junggamyeon/JWPlaceholderAPI
- **Discord:** https://discord.gg/junggamyeon
- **Repository:** https://github.com/junggamyeon/JWPlaceholderAPI-Page
