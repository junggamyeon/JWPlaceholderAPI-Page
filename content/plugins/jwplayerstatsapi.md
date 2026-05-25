---
name: JWPlayerStatsAPI
author: JWDev
description: Comprehensive player statistics tracking API for EndstoneMC servers.
version: 1.0.0
updated: 2025-05-20
placeholders: 46
---

## Overview

JWPlayerStatsAPI tracks detailed player statistics across combat, farming, mining, economy, travel, and more. All stats are exposed as placeholders via JWPlaceholderAPI.

:::info
All placeholders return data for the current player. Stats are tracked automatically — no configuration needed.
:::

## Combat Placeholders

| Placeholder | Description | Status |
|-------------|-------------|--------|
| `%jwstats_kills%` | Total player kills | `{green} Active` |
| `%jwstats_deaths%` | Total deaths | `{green} Active` |
| `%jwstats_highest_killstreak%` | Best killstreak ever | `{green} Active` |
| `%jwstats_current_killstreak%` | Current killstreak | `{green} Active` |
| `%jwstats_damage_dealt%` | Total damage dealt | `{green} Active` |
| `%jwstats_damage_taken%` | Total damage taken | `{green} Active` |
| `%jwstats_critical_hits%` | Critical hit count | `{green} Active` |
| `%jwstats_totem_uses%` | Totem of Undying uses | `{green} Active` |

## Weapon Placeholders

| Placeholder | Description | Status |
|-------------|-------------|--------|
| `%jwstats_sword_uses%` | Sword attack count | `{green} Active` |
| `%jwstats_bow_shots%` | Bow shots fired | `{green} Active` |
| `%jwstats_trident_throws%` | Trident throws | `{green} Active` |
| `%jwstats_arrow_hits%` | Arrows that hit target | `{green} Active` |
| `%jwstats_arrow_misses%` | Arrows that missed | `{green} Active` |

## Farming & Nature Placeholders

| Placeholder | Description | Status |
|-------------|-------------|--------|
| `%jwstats_mob_kills%` | Total mob kills | `{green} Active` |
| `%jwstats_animals_killed%` | Animals killed | `{green} Active` |
| `%jwstats_crops_harvested%` | Crops harvested | `{green} Active` |
| `%jwstats_seeds_planted%` | Seeds planted | `{green} Active` |
| `%jwstats_fish_caught%` | Fish caught | `{green} Active` |
| `%jwstats_animals_bred%` | Animals bred | `{green} Active` |

## Mining & Building Placeholders

| Placeholder | Description | Status |
|-------------|-------------|--------|
| `%jwstats_blocks_broken%` | Total blocks broken | `{green} Active` |
| `%jwstats_blocks_placed%` | Total blocks placed | `{green} Active` |
| `%jwstats_pickaxe_uses%` | Pickaxe uses | `{green} Active` |
| `%jwstats_shovel_uses%` | Shovel uses | `{green} Active` |
| `%jwstats_axe_uses%` | Axe uses | `{green} Active` |
| `%jwstats_crafted_items%` | Items crafted | `{green} Active` |
| `%jwstats_smelted_items%` | Items smelted | `{green} Active` |
| `%jwstats_enchanted_items%` | Items enchanted | `{green} Active` |

## Container Placeholders

| Placeholder | Description | Status |
|-------------|-------------|--------|
| `%jwstats_chest_opened%` | Chests opened | `{green} Active` |
| `%jwstats_barrel_opened%` | Barrels opened | `{green} Active` |
| `%jwstats_shulker_opened%` | Shulker boxes opened | `{green} Active` |

## Economy Placeholders

| Placeholder | Description | Status |
|-------------|-------------|--------|
| `%jwstats_money_earned%` | Total money earned | `{green} Active` |
| `%jwstats_money_spent%` | Total money spent | `{green} Active` |
| `%jwstats_highest_balance%` | Highest balance ever | `{green} Active` |
| `%jwstats_richest_streak%` | Days as richest player | `{green} Active` |

## Travel Placeholders

| Placeholder | Description | Status |
|-------------|-------------|--------|
| `%jwstats_distance_walked%` | Distance walked | `{green} Active` |
| `%jwstats_distance_sprinted%` | Distance sprinted | `{green} Active` |
| `%jwstats_distance_swum%` | Distance swum | `{green} Active` |
| `%jwstats_distance_elytra%` | Distance by elytra | `{green} Active` |
| `%jwstats_distance_horse%` | Distance by horse | `{green} Active` |
| `%jwstats_distance_boat%` | Distance by boat | `{green} Active` |
| `%jwstats_distance_nether%` | Distance in Nether | `{green} Active` |
| `%jwstats_chunks_discovered%` | Chunks discovered | `{green} Active` |
| `%jwstats_structures_discovered%` | Structures found | `{green} Active` |

## Time Placeholders

| Placeholder | Description | Status |
|-------------|-------------|--------|
| `%jwstats_time_played%` | Total play time | `{green} Active` |
| `%jwstats_afk_time%` | Total AFK time | `{green} Active` |

## Dynamic Placeholders

These placeholders accept a parameter to query specific types:

| Placeholder | Description | Status |
|-------------|-------------|--------|
| `%jwstats_money_earned_<currency>%` | Earned for specific currency | `{blue} Dynamic` |
| `%jwstats_money_spent_<currency>%` | Spent for specific currency | `{blue} Dynamic` |
| `%jwstats_highest_balance_<currency>%` | Highest balance for currency | `{blue} Dynamic` |
| `%jwstats_mob_kill_<entity_type>%` | Kills for specific mob type | `{blue} Dynamic` |
| `%jwstats_block_break_<block_type>%` | Breaks for specific block | `{blue} Dynamic` |
| `%jwstats_block_place_<block_type>%` | Places for specific block | `{blue} Dynamic` |

:::tip
Replace `<currency>`, `<entity_type>`, or `<block_type>` with the actual identifier. For example: `%jwstats_mob_kill_zombie%` or `%jwstats_block_break_diamond_ore%`.
:::

## Links

- GitHub: [JWPlayerStatsAPI](https://github.com/junggamyeon/JWPlayerStatsAPI)
- JWPlaceholderAPI: [GitHub](https://github.com/junggamyeon/JWPlaceholderAPI)
