import type { Project } from "@/content/projects";

/**
 * Layered architecture diagram drawn from the project's `diagram.layers`.
 * Deliberately schematic — it shows the shape of the migration, not the detail.
 * Replace with a real exported diagram once sanitized ones are available; the
 * surrounding figure frame and caption stay the same.
 */
export function FlowDiagram({ diagram }: { diagram: Project["diagram"] }) {
  return (
    <figure className="border border-rule bg-surface/60">
      <div className="neon-grid px-4 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto flex max-w-3xl flex-col items-stretch">
          {diagram.layers.map((layer, layerIndex) => (
            <div key={layer.label}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <span className="annot sm:w-24 sm:shrink-0 sm:text-right">{layer.label}</span>
                <ul className="flex flex-1 flex-wrap gap-2">
                  {layer.nodes.map((node) => (
                    <li
                      key={node}
                      className="flex-1 whitespace-nowrap border border-rule-strong bg-bg px-3 py-2.5 text-center font-mono text-[11px] tracking-[0.06em] text-ink-soft"
                    >
                      {node}
                    </li>
                  ))}
                </ul>
              </div>

              {layerIndex < diagram.layers.length - 1 && <Connector />}
            </div>
          ))}
        </div>
      </div>
      <figcaption className="border-t border-rule px-4 py-3 sm:px-8">
        <span className="annot normal-case tracking-[0.06em]">{diagram.caption}</span>
      </figcaption>
    </figure>
  );
}

/** Vertical drop between two tiers, with an arrowhead. */
function Connector() {
  return (
    <div aria-hidden="true" className="flex sm:pl-28">
      <div className="flex flex-1 flex-col items-center py-2">
        <span className="h-5 w-px bg-rule-strong" />
        <span
          className="size-0 border-x-[3px] border-t-[4px] border-x-transparent"
          style={{ borderTopColor: "var(--rule-strong)" }}
        />
      </div>
    </div>
  );
}
