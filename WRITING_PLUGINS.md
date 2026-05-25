# Writing Plugin Documentation

This guide explains how to write a plugin Markdown file that renders beautifully on the JWPlaceholderAPI website.

## File Location

Create your file in:

```
content/plugins/yourplugin.md
```

The filename (without `.md`) becomes the URL slug: `/plugins/yourplugin`

## Required Frontmatter

Every plugin file must start with YAML frontmatter:

```yaml
---
name: YourPlugin
author: YourName
description: A short one-line description of your plugin.
version: 1.0.0
updated: 2025-06-01
placeholders: 12
---
```

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Display name of your plugin |
| `author` | Yes | Plugin author name |
| `description` | Yes | Short description shown in cards and header |
| `version` | No | Plugin version (displayed as badge in header) |
| `updated` | No | Last updated date (displayed in header) |
| `placeholders` | No | Number of placeholders (displayed in header) |

## Markdown Features

Everything below the frontmatter is rendered as the plugin page body. The following features are supported and styled automatically.

### Headings

Use `##` and `###` for sections. Avoid `#` (h1) since the plugin name is already displayed as the page title.

```markdown
## Section Title

### Subsection
```

### Tables

Tables render as styled components with borders, header backgrounds, and hover states. Use standard GFM table syntax:

```markdown
| Placeholder | Description | Example Output |
|-------------|-------------|----------------|
| `%plugin_value%` | Returns the value | `100` |
| `%plugin_name%` | Returns player name | `Steve` |
```

Tips for tables:
- Always include the header row and separator row (`|---|`)
- Use inline code (backticks) for placeholder names
- Keep descriptions concise

### Code Blocks with Syntax Highlighting

Fenced code blocks with a language tag get full syntax highlighting (powered by Shiki, github-dark theme).

Supported languages include: `python`, `java`, `json`, `yaml`, `javascript`, `typescript`, `bash`, `toml`, and many more.

````markdown
```python
from endstone.plugin import Plugin

class MyPlugin(Plugin):
    prefix = "MyPlugin"
    api_version = "0.10"

    def on_enable(self):
        self.logger.info("Plugin enabled!")
```
````

````markdown
```json
{
  "default_group": "default",
  "permissions": {
    "myplugin.use": true
  }
}
```
````

````markdown
```yaml
settings:
  debug: false
  max_retries: 3
  database:
    type: sqlite
    path: data/plugin.db
```
````

**Important:** Always specify the language after the opening triple backticks. Without a language tag, code blocks render as plain text without colors.

### Inline Code

Use single backticks for inline code references:

```markdown
Use `%plugin_value%` to get the value. Run `/plugin reload` to refresh.
```

### Lists

Both ordered and unordered lists are supported:

```markdown
- Feature one
- Feature two
- Feature three

1. First step
2. Second step
3. Third step
```

### Bold and Italic

```markdown
**Bold text** for emphasis.
*Italic text* for secondary emphasis.
***Bold italic*** for strong emphasis.
```

### Links

```markdown
[Link text](https://example.com)
```

### Blockquotes

```markdown
> **Note:** This is an important notice about the plugin.
```

### Callout Blocks

Use `:::type` syntax to create styled callout cards. Supported types: `warning`, `info`, `danger`, `tip`.

```markdown
:::warning
This placeholder requires permission `myplugin.admin`.
:::

:::info
Works only with online players.
:::

:::danger
This action cannot be undone.
:::

:::tip
Use caching for better performance.
:::
```

Each callout renders as a colored card with an icon:
- `warning` — yellow with alert icon
- `info` — blue with info icon
- `danger` — red with alert icon
- `tip` — green with info icon

### Copy Button on Code Blocks

All code blocks automatically show a copy-to-clipboard button on hover. No special syntax needed — it works on every fenced code block.

### Anchor Links on Headings

Every heading (`##`, `###`, etc.) automatically gets an anchor link. On hover, a `#` icon appears. Clicking it navigates to that section and updates the URL hash, making it easy to share links to specific sections.

## Complete Example

Here's a full plugin file demonstrating all features:

````markdown
---
name: MyPlugin
author: YourName
description: Example plugin showing all documentation features.
version: 2.1.0
updated: 2025-06-01
placeholders: 3
---

## Overview

MyPlugin provides **placeholder support** for player statistics. It integrates with JWPlaceholderAPI to expose data from your server.

:::info
Works only with online players.
:::

## Supported Placeholders

| Placeholder | Status | Description |
|-------------|--------|-------------|
| `%myplugin_level%` | `{green} Active` | Player level |
| `%myplugin_xp%` | `{green} Active` | Current XP |
| `%myplugin_rank%` | `{yellow} Beta` | Player rank |

## Configuration

Edit `config.yml` in the plugin folder:

```yaml
settings:
  update_interval: 60
  cache_enabled: true
  default_level: 1
```

## Developer API

:::warning
This API is async. You must use `await` inside an async function.
:::

```python
from endstone.plugin import Plugin

class ShopPlugin(Plugin):
    prefix = "Shop"
    api_version = "0.10"

    def on_enable(self):
        myplugin = self.server.plugin_manager.get_plugin("myplugin")
        api = myplugin.get_api()
        self.logger.info("Connected to MyPlugin API")
```

## Commands

| Command | Permission | Description |
|---------|------------|-------------|
| `/myplugin info` | `myplugin.info` | Show plugin info |
| `/myplugin reload` | `myplugin.admin` | Reload configuration |

## Links

- GitHub: [github.com/yourname/myplugin](https://github.com/yourname/myplugin)
- Issues: [Report a bug](https://github.com/yourname/myplugin/issues)
````

## Color Highlights

You can add colored highlights to text inside table cells (or anywhere inline code is used) with this syntax:

```
`{color} your text here`
```

### Supported Colors

| Syntax | Result |
|--------|--------|
| `{red} Danger` | Red highlighted text |
| `{green} Success` | Green highlighted text |
| `{blue} Info` | Blue highlighted text |
| `{yellow} Warning` | Yellow highlighted text |
| `{orange} Notice` | Orange highlighted text |
| `{purple} Special` | Purple highlighted text |
| `{pink} Highlight` | Pink highlighted text |
| `{cyan} Note` | Cyan highlighted text |

### Example Usage in Tables

```markdown
| Placeholder | Status | Description |
|-------------|--------|-------------|
| `%plugin_level%` | `{green} Active` | Returns player level |
| `%plugin_old%` | `{red} Deprecated` | Old placeholder, use level instead |
| `%plugin_beta%` | `{yellow} Beta` | Experimental feature |
```

This renders each status as a colored badge, making tables easier to scan visually.

### How It Works

When you write `` `{color} text` `` (backtick-wrapped with a `{color}` prefix), the renderer detects the pattern and displays it as a colored badge instead of plain inline code. If the color name is not recognized, it renders as normal inline code.

## Tips

- Keep descriptions short and scannable
- Use tables for placeholder lists — they render much better than plain lists
- Always tag code blocks with a language for syntax highlighting
- Use color highlights for status columns in tables
- Include a "Commands" section if your plugin has commands
- Link to your GitHub repository for source code access
- Test your page locally with `npm run dev` before submitting