---
name: XPerms
author: CYooBin10
description: Permission and group management system for EndstoneMC servers.
version: 1.0.0
updated: 2025-05-20
placeholders: 4
---

## Overview

XPerms is a lightweight, easy-to-use permission management plugin for Endstone servers. Create groups, assign permissions, and customize player prefixes and suffixes for an enhanced server experience.

Inspired by **LuckPerms** but designed with **simplicity and lightweight** in mind.

:::info
All commands require the `xperms.admin` permission (OP by default).
:::

## Features

- Create and manage player groups/ranks
- Assign permissions to groups
- Customize player prefixes and suffixes
- Chat format customization with color code support
- Simple JSON-based data storage
- Hot-reload support (no server restart needed)

## Supported Placeholders

| Placeholder | Description | Status |
|-------------|-------------|--------|
| `%xperms_group%` | Player's current group name | `{green} Active` |
| `%xperms_prefix%` | Player's group prefix | `{green} Active` |
| `%xperms_suffix%` | Player's group suffix | `{green} Active` |
| `%xperms_group_count%` | Total number of groups | `{green} Active` |

## Configuration

The plugin uses JSON for data storage. Configuration files are automatically generated on first run.

### Data Structure

```json
{
  "default_group": "default",
  "groups": {
    "default": {
      "prefix": "§7[Member]",
      "suffix": "",
      "permissions": [],
      "chat_format": "{prefix} {name}{suffix}§r: {message}"
    },
    "vip": {
      "prefix": "§a[VIP]",
      "suffix": "",
      "permissions": ["vip.extra"],
      "chat_format": "{prefix} {name}{suffix}§r: {message}"
    }
  },
  "users": {
    "playername": {
      "group": "vip"
    }
  }
}
```

:::tip
Configuration file is located at `plugins/XPerms/data.json`. Changes take effect after `/xperms reload`.
:::

## Commands

### Group Management

| Command | Description | Status |
|---------|-------------|--------|
| `/xperms groups` | List all groups | `{green} Active` |
| `/xperms create <name>` | Create a new group | `{green} Active` |
| `/xperms delete <name>` | Delete a group | `{red} Destructive` |
| `/xperms info <name>` | View group information | `{green} Active` |
| `/xperms setprefix <name> <prefix>` | Set group prefix | `{green} Active` |
| `/xperms setsuffix <name> <suffix>` | Set group suffix | `{green} Active` |
| `/xperms setformat <name> <format>` | Set custom chat format | `{green} Active` |
| `/xperms addperm <name> <permission>` | Add permission to group | `{green} Active` |
| `/xperms removeperm <name> <permission>` | Remove permission | `{yellow} Caution` |

### Player Management

| Command | Description | Status |
|---------|-------------|--------|
| `/xperms setgroup <player> <group>` | Assign group to player | `{green} Active` |
| `/xperms playerinfo <player>` | View player information | `{green} Active` |

### System

| Command | Description | Status |
|---------|-------------|--------|
| `/xperms reload` | Reload plugin data | `{blue} System` |

## Usage Examples

### Create Groups with Prefixes

```bash
/xperms create vip
/xperms setprefix vip §a[VIP]

/xperms create admin
/xperms setprefix admin §c[Admin]
```

### Add Permissions

```bash
/xperms addperm vip vip.extra
/xperms addperm admin xperms.admin
/xperms addperm admin admin.build
```

### Assign Players to Groups

```bash
/xperms setgroup PlayerName vip
/xperms setgroup AdminName admin
```

:::warning
Deleting a group will move all players in that group to the default group. This action cannot be undone.
:::

## Chat Format

The plugin supports custom chat formats with the following variables:

| Variable | Description |
|----------|-------------|
| `{prefix}` | Player's group prefix |
| `{name}` | Player's display name |
| `{suffix}` | Player's group suffix |
| `{message}` | The chat message content |

### Default Format

```
{prefix} {name}{suffix}§r: {message}
```

### Custom Format Example

```
§7[§r{prefix}§7]§r {name}§r: §f{message}
```

## Links

- GitHub: [XPerms](https://github.com/CYooBin10/XPerms)
- JWPlaceholderAPI: [GitHub](https://github.com/junggamyeon/JWPlaceholderAPI)
