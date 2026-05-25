import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import { visit } from "unist-util-visit";
import { codeToHtml } from "shiki";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CopyButton } from "@/components/copy-button";
import { AlertTriangle, Info } from "lucide-react";

const COLOR_MAP: Record<string, string> = {
  red: "bg-red-500/15 text-red-400",
  green: "bg-green-500/15 text-green-400",
  blue: "bg-blue-500/15 text-blue-400",
  yellow: "bg-yellow-500/15 text-yellow-400",
  orange: "bg-orange-500/15 text-orange-400",
  purple: "bg-purple-500/15 text-purple-400",
  pink: "bg-pink-500/15 text-pink-400",
  cyan: "bg-cyan-500/15 text-cyan-400",
};

const COLOR_REGEX = /^\{(\w+)\}\s(.+)$/;

const CALLOUT_STYLES: Record<string, { border: string; bg: string; icon: React.ReactNode }> = {
  warning: {
    border: "border-yellow-500/50",
    bg: "bg-yellow-500/10",
    icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
  },
  info: {
    border: "border-blue-500/50",
    bg: "bg-blue-500/10",
    icon: <Info className="h-5 w-5 text-blue-500" />,
  },
  danger: {
    border: "border-red-500/50",
    bg: "bg-red-500/10",
    icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
  },
  tip: {
    border: "border-green-500/50",
    bg: "bg-green-500/10",
    icon: <Info className="h-5 w-5 text-green-500" />,
  },
};

function remarkCallouts() {
  return (tree: Parameters<typeof visit>[0]) => {
    visit(tree, (node) => {
      if (
        node.type === "containerDirective"
      ) {
        const directive = node as { type: string; name: string; data?: Record<string, unknown>; attributes?: Record<string, string> };
        const name = directive.name;
        if (!CALLOUT_STYLES[name]) return;

        const data = directive.data || (directive.data = {});
        data.hName = "div";
        data.hProperties = {
          "data-callout": name,
        };
      }
    });
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

async function CodeBlock({
  className,
  children,
  copy,
}: {
  className?: string;
  children?: React.ReactNode;
  copy?: boolean;
}) {
  const match = /language-(\w+)/.exec(className || "");
  const lang = match ? match[1] : "text";
  const code = String(children).replace(/\n$/, "");

  const html = await codeToHtml(code, {
    lang,
    theme: "github-dark",
  });

  return (
    <div className="not-prose group/code relative my-4 overflow-hidden rounded-lg border border-border">
      {copy !== false && (
        <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover/code:opacity-100">
          <CopyButton text={code} />
        </div>
      )}
      <div
        className="[&_pre]:overflow-x-auto [&_pre]:p-4 [&_pre]:text-sm [&_pre]:leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

function ColorBadge({ color, children }: { color: string; children: string }) {
  const classes = COLOR_MAP[color] || COLOR_MAP.blue;
  return (
    <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-sm font-medium ${classes}`}>
      {children}
    </span>
  );
}

function InlineCode({ children }: { children?: React.ReactNode }) {
  const text = String(children);
  const colorMatch = COLOR_REGEX.exec(text);

  if (colorMatch) {
    const [, color, content] = colorMatch;
    if (COLOR_MAP[color]) {
      return <ColorBadge color={color}>{content}</ColorBadge>;
    }
  }

  return (
    <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono text-foreground">
      {children}
    </code>
  );
}

function Callout({ type, children }: { type: string; children?: React.ReactNode }) {
  const style = CALLOUT_STYLES[type] || CALLOUT_STYLES.info;
  return (
    <div className={`not-prose my-4 flex gap-3 rounded-lg border p-4 ${style.border} ${style.bg}`}>
      <div className="shrink-0 pt-0.5">{style.icon}</div>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function HeadingWithAnchor({
  level,
  children,
}: {
  level: number;
  children?: React.ReactNode;
}) {
  const text = extractText(children);
  const id = slugify(text);
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;

  return (
    <Tag id={id} className="group relative scroll-mt-20">
      {children}
      <a
        href={`#${id}`}
        className="ml-2 inline-opacity-0 text-muted-foreground transition-opacity group-hover:opacity-100"
        aria-label={`Link to ${text}`}
      >
        #
      </a>
    </Tag>
  );
}

function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return extractText((node as { props: { children?: React.ReactNode } }).props.children);
  }
  return "";
}

function MdTable({ children }: { children?: React.ReactNode }) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-border">
      <Table>{children}</Table>
    </div>
  );
}

function MdThead({ children }: { children?: React.ReactNode }) {
  return <TableHeader className="bg-muted/50">{children}</TableHeader>;
}

function MdTbody({ children }: { children?: React.ReactNode }) {
  return <TableBody>{children}</TableBody>;
}

function MdTr({ children }: { children?: React.ReactNode }) {
  return <TableRow>{children}</TableRow>;
}

function MdTh({ children }: { children?: React.ReactNode }) {
  return (
    <TableHead className="font-semibold text-foreground">{children}</TableHead>
  );
}

function MdTd({ children }: { children?: React.ReactNode }) {
  return <TableCell className="whitespace-normal">{children}</TableCell>;
}

export async function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-li:marker:text-muted-foreground">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkDirective, remarkCallouts]}
        components={{
          table: MdTable,
          thead: MdThead,
          tbody: MdTbody,
          tr: MdTr,
          th: MdTh,
          td: MdTd,
          h1: ({ children }) => <HeadingWithAnchor level={1}>{children}</HeadingWithAnchor>,
          h2: ({ children }) => <HeadingWithAnchor level={2}>{children}</HeadingWithAnchor>,
          h3: ({ children }) => <HeadingWithAnchor level={3}>{children}</HeadingWithAnchor>,
          h4: ({ children }) => <HeadingWithAnchor level={4}>{children}</HeadingWithAnchor>,
          div: (({ node, children, ...props }: { node?: { properties?: { "data-callout"?: string } }; children?: React.ReactNode }) => {
            const calloutType = node?.properties?.["data-callout"];
            if (calloutType) {
              return <Callout type={calloutType}>{children}</Callout>;
            }
            return <div {...props}>{children}</div>;
          }) as never,
          pre: ({ children }) => <>{children}</>,
          code: (({ className, children }: { className?: string; children?: React.ReactNode }) => {
            const isBlock = /language-/.test(className || "");
            if (isBlock) {
              const langMatch = /language-(\w+)/.exec(className || "");
              const lang = langMatch ? langMatch[1] : "";
              if (lang === "copy") {
                return <CodeBlock className="language-text" copy>{children}</CodeBlock>;
              }
              return <CodeBlock className={className} copy>{children}</CodeBlock>;
            }
            return <InlineCode>{children}</InlineCode>;
          }) as never,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
