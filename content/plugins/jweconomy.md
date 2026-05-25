---
name: JWEconomy
author: JWDev
description: Modern economy system for EndstoneMC survival servers.
version: 1.0.0
updated: 2025-05-20
placeholders: 6
---

## Overview

JWEconomy is a robust, lightweight, and highly performant multi-currency economy plugin for Minecraft Bedrock, built specifically for **Endstone Software**.

It provides server administrators with a fully-featured monetary system that is easy to manage, fast, and scalable — supporting everything from local SQLite databases to large MySQL/MariaDB networks.

:::info
All commands accept an optional `[currency]` argument. If omitted, the default currency (e.g., `coins`) is used.
:::

## Key Features

- Multi-currency system (Coins, Gems, Tokens, etc.)
- Physical bank notes via `/withdraw` — trade safely as items
- High-performance database (SQLite WAL mode or MariaDB/MySQL pools)
- Data import tools from other plugins
- Smart memory caching for instant balance retrieval
- Configurable taxation on player-to-player transfers
- Leaderboards with `/eco top`
- 100% customizable messages and currency formats

## Supported Placeholders

| Placeholder | Description | Returns |
|-------------|-------------|---------|
| `%jweconomy_balance%` | Player's balance (default currency) | `float` |
| `%jweconomy_balance_<currency>%` | Player's balance for specific currency | `float` |
| `%jweconomy_currency_symbol%` | Default currency symbol | `string` |
| `%jweconomy_currency_name%` | Default currency name | `string` |
| `%jweconomy_top_1%` | Richest player name | `string` |
| `%jweconomy_top_1_balance%` | Richest player balance | `float` |

## Commands & Permissions

### Player Commands

| Command | Permission | Description |
|---------|------------|-------------|
| `/balance [player] [currency]` | `jweconomy.command.balance` | Check balance |
| `/pay <player> <amount> [currency]` | `jweconomy.command.pay` | Transfer money |
| `/withdraw <amount> [currency]` | `jweconomy.command.withdraw` | Withdraw as physical item |
| `/eco top [page] [currency]` | `jweconomy.command.eco` | View leaderboard |

### Admin Commands

| Command | Permission | Description |
|---------|------------|-------------|
| `/eco give <player> <amount> [curr]` | `jweconomy.admin` | `{green} Add` money to player |
| `/eco take <player> <amount> [curr]` | `jweconomy.admin` | `{red} Deduct` money from player |
| `/eco set <player> <amount> [curr]` | `jweconomy.admin` | `{yellow} Set` exact balance |
| `/eco reload` | `jweconomy.admin` | Reload config and messages |
| `/eco import mysql <host>...` | `jweconomy.admin` | Import from MySQL |
| `/eco import sqlite <file_path>` | `jweconomy.admin` | Import from SQLite |

## Developer API

:::warning
JWEconomy uses an asynchronous database. You cannot call API methods directly inside a command or event handler. You must use `async def` and run it via JWEconomy's async thread.
:::

### Quick Start Example

```python
from endstone.plugin import Plugin
from endstone.command import CommandSender, Command
from endstone import Player
from endstone.inventory import ItemStack

class MyShopPlugin(Plugin):
    prefix = "MyShop"
    api_version = "0.10"

    commands = {
        "buyapple": {
            "description": "Buy an apple for 50 coins",
            "usages": ["/buyapple"]
        }
    }

    def on_command(self, sender: CommandSender, command: Command, args: list[str]) -> bool:
        if not isinstance(sender, Player):
            return False

        jweco = self.server.plugin_manager.get_plugin("jweconomy")
        if not jweco:
            sender.send_message("§cJWEconomy is not installed!")
            return True

        api = jweco.get_api()
        player_uuid = str(sender.unique_id)
        price = 50.0
        currency = "coins"

        async def process_purchase():
            try:
                has_money = await api.has_balance(player_uuid, price, currency)

                if not has_money:
                    self.server.scheduler.run_task(self, lambda: sender.send_message("§cYou don't have enough coins!"))
                    return

                await api.remove_balance(player_uuid, price, currency)

                def give_item():
                    sender.inventory.add_item(ItemStack("minecraft:apple"))
                    sender.send_message("§aYou bought an Apple for 50 coins!")

                self.server.scheduler.run_task(self, give_item)

            except Exception as e:
                self.logger.error(f"Transaction error: {e}")

        jweco.run_async(process_purchase())
        return True
```

### API Methods

All methods are `async` and must be `await`ed. They accept an optional `currency: str` argument.

| Method | Description | Returns |
|--------|-------------|---------|
| `await api.get_balance(uuid, [currency])` | Get player balance | `float` |
| `await api.has_balance(uuid, amount, [currency])` | Check if player has enough | `bool` |
| `await api.add_balance(uuid, amount, [currency])` | Add money | `float` |
| `await api.remove_balance(uuid, amount, [currency])` | Remove money | `float` or `None` |
| `await api.set_balance(uuid, amount, [currency])` | Set exact balance | `float` |
| `await api.transfer_balance(from, to, amount, [currency])` | Transfer with tax | `TransferResult` |

### Synchronous Utility Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `api.get_currency_symbol("gems")` | Get currency symbol | `string` |
| `api.get_currency_name("coins")` | Get currency display name | `string` |
| `api.get_currency_name_plural("coins")` | Get plural name | `string` |

## Links

- GitHub: [JWEconomy](https://github.com/junggamyeon/JWEconomy)
- JWPlaceholderAPI: [GitHub](https://github.com/junggamyeon/JWPlaceholderAPI)
