import Image from "next/image";
import type { WikiBodyBlock } from "@/content/wiki/types";

function textWithLinks(text: string) {
  return text.split(/(\[[^\]]+\]\(https?:\/\/[^\s)]+\)|https?:\/\/[^\s)\]]+)/g).map((part, index) => {
    const markdownLink = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
    const href = markdownLink?.[2] ?? (part.startsWith("http") ? part : undefined);
    return href ? <a key={index} href={href} target="_blank" rel="noopener noreferrer" className="wiki-link">{markdownLink?.[1] ?? part}</a> : part;
  });
}

function blockText(block: { text?: string; content?: string }) {
  return block.text ?? block.content ?? "";
}

function listItemText(item: string | { content?: string; text?: string }) {
  return typeof item === "string" ? item : blockText(item);
}

export function WikiRenderer({ blocks }: { blocks: WikiBodyBlock[] }) {
  return <div className="wiki-prose">
    {blocks.map((block, index) => {
      switch (block.type) {
        case "heading": {
          const Heading = block.level === 2 ? "h2" : "h3";
          const text = blockText(block);
          return <Heading key={index} id={text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}>{text}</Heading>;
        }
        case "paragraph": return <p key={index}>{textWithLinks(blockText(block))}</p>;
        case "list": { const List = block.ordered ? "ol" : "ul"; return <List key={index}>{block.items.map((item, itemIndex) => <li key={itemIndex}>{textWithLinks(listItemText(item))}</li>)}</List>; }
        case "ruleList": return <dl key={index} className="wiki-rules">{block.items.map((item) => <div key={item.title}><dt>{item.title}</dt><dd>{textWithLinks(item.text)}</dd></div>)}</dl>;
        case "code": return <pre key={index}><code>{block.code}</code></pre>;
        case "link": return <p key={index} className="wiki-resource"><a href={block.href} target="_blank" rel="noopener noreferrer">{block.label}</a>{block.description ? <span>{block.description}</span> : null}</p>;
        case "callout": return <aside key={index} className={`wiki-callout wiki-callout-${block.variant}`}>{block.text}</aside>;
        case "table": return <div key={index} className="wiki-table-wrap"><table><thead><tr>{block.head.map((head) => <th key={head}>{head}</th>)}</tr></thead><tbody>{block.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>;
        case "image": return <figure key={index}><Image src={block.src} alt={block.alt} width={1200} height={700} unoptimized /><figcaption>{block.caption ?? block.alt}</figcaption></figure>;
        case "video": { const id = block.src.match(/(?:youtu\.be\/|v=)([A-Za-z0-9_-]{11})/)?.[1]; return <figure key={index}>{id ? <iframe src={`https://www.youtube-nocookie.com/embed/${id}`} title={block.title} loading="lazy" allowFullScreen /> : <a href={block.src} target="_blank" rel="noopener noreferrer">{block.title}</a>}<figcaption>{block.caption ?? block.title}</figcaption></figure>; }
      }
    })}
  </div>;
}
