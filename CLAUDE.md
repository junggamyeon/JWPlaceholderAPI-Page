# CLAUDE.md

## Mục tiêu
Xây dựng lại frontend theo hướng documentation site, dùng shadcn/ui và giữ nguyên tech stack hiện tại của workspace.

## Tổng quan dự án
- Next.js App Router site để duyệt và đọc tài liệu plugin của JWPlaceholderAPI.
- Nội dung Markdown nằm trong `content/plugins/`.
- Mỗi file có frontmatter và body Markdown mô tả placeholders.

Frontmatter bắt buộc:

```
---
name: PluginName
author: AuthorName
description: Short description.
---
```

Slug của plugin lấy từ tên file (không có .md).

## Tech stack bắt buộc
- Next.js App Router
- TypeScript
- Tailwind CSS 4
- shadcn/ui (Radix UI primitives)
- Lucide React (nếu đã có trong repo)
- gray-matter (parse frontmatter)
- @tailwindcss/typography (prose cho Markdown)

Path alias:

```ts
@/* -> src/*
```

## Package manager va lenh
- Repo có `package-lock.json` và `bun.lock`.
- Ưu tiên npm nếu README hiện tại dùng npm; không tự ý xóa lockfiles.
- Dùng scripts trong `package.json`. Dự kiến:
  - `npm install`
  - `npm run dev`
  - `npm run build`
  - `npm run start`
  - `npm run lint`

## Kiến trúc hiện có
- Content source: `content/plugins/*.md`
- Loader: `src/lib/plugins.ts`
  - `getAllPlugins()`
  - `getPluginBySlug(slug)`
- Routes:
  - `src/app/page.tsx`
  - `src/app/plugins/[slug]/page.tsx`
- Plugin detail pages phải được static generate từ toàn bộ slug.

## Yêu cầu UI (documentation site)
- App shell: header/top nav, sidebar, main content.
- Responsive tốt trên desktop/tablet/mobile; tránh horizontal overflow.
- Sidebar:
  - Danh sách plugin, có trạng thái active.
  - Scrollable khi dài.
  - Mobile dùng sheet/drawer (shadcn/ui).
- Homepage:
  - Tieu de ro rang + mo ta ngan.
  - Search/filter.
  - Grid/list card plugin: name, author, description, link chi tiet.
- Plugin detail:
  - Ten, tac gia, mo ta.
  - Markdown render voi typography dep.
  - Code block va table style ro rang.
  - Handling khi slug khong ton tai.
- Search:
  - Client-side.
  - Filter theo name/author/description.
  - Case-insensitive.
  - Empty state khi khong co ket qua.

## shadcn/ui usage
- Dùng các component trong `src/components/ui/`.
- Nếu cần component mới, thêm theo cấu hình shadcn hiện có (`components.json`).
- Ưu tiên: button, input, card, badge, separator, scroll-area, sheet, sidebar, command.

## Markdown rendering
- Không hardcode data; luôn lấy từ Markdown trong `content/plugins/`.
- Dùng `prose` classes; hỗ trợ headings, lists, inline code, code blocks, tables, links, blockquotes.

## Quy tắc code
- TypeScript rõ ràng, không dùng `any`.
- Không unused imports, không dead code, không `console.log`.
- Server components giữ server; chỉ `"use client"` khi cần state/effect/event.
- Tránh JSX quá sâu; tách component hợp lý.
- Dùng `cn()` cho className điều kiện.

## Không được làm
- Không đổi framework hoặc kiến trúc chính.
- Không thay Markdown bằng JSX tĩnh.
- Không thêm database, auth, hoặc state management library không cần thiết.
- Không thêm test framework nếu chưa được yêu cầu.
- Không thay đổi pipeline Tailwind/Next.
- Không làm mất bundling content trong `next.config.ts` (giữ `content/plugins/**`).

## README
Cập nhật README.md bằng tiếng Anh, gồm:
- Project name + description
- Tech stack
- Features
- Project structure
- Installation
- Dev command
- Build command
- Start command
- Lint command
- Cách thêm plugin Markdown mới
- Frontmatter example
- Notes về content source

## Thu tu trien khai goi y
1. Inspect cấu trúc + `package.json`.
2. Verify shadcn config trong `components.json`.
3. Review `src/lib/plugins.ts`.
4. Rebuild layout + app shell.
5. Rebuild homepage UI.
6. Rebuild plugin detail page.
7. Improve sidebar + mobile navigation.
8. Improve search + empty states.
9. Update README.
10. Run lint/build và sửa lỗi.
