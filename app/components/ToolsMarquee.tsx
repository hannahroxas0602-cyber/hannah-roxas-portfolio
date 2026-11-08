// The tools strip: real logos and names (Simple Icons) scrolling in one line, faded at both
// ends. Used by the About panel and the home page's tools tile; the caller supplies the card.
export const tools = [
  { name: "Figma", slug: "figma" },
  { name: "Adobe CC", slug: "adobecreativecloud" },
  { name: "Slack", slug: "slack" },
  { name: "GitHub", slug: "github" },
  { name: "Cursor", slug: "cursor" },
  { name: "Notion", slug: "notion" },
  { name: "Linear", slug: "linear" },
  { name: "VS Code", slug: "visualstudiocode" },
];

export default function ToolsMarquee() {
  return (
    <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] items-center motion-reduce:animate-none">
        {[...tools, ...tools].map((tool, i) => (
          <div key={`${tool.slug}-${i}`} className="flex h-6 shrink-0 items-center gap-2.5 px-5">
            <span
              aria-hidden
              className="block size-5 shrink-0 bg-accent-deep"
              style={{
                WebkitMaskImage: `url(https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${tool.slug}.svg)`,
                maskImage: `url(https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${tool.slug}.svg)`,
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            />
            <span className="text-sm leading-none font-medium whitespace-nowrap text-neutral-800">
              {tool.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
