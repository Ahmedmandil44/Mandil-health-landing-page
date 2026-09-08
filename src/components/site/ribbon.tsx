const ITEMS = [
  "49 states",
  "Individuals",
  "Families",
  "Self employed",
  "Small business owners",
  "Private health",
  "Whole life",
  "Final expense",
];

export function Ribbon() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <section
      aria-label="Who Mandil Health serves"
      className="border-y border-line bg-cream py-4 overflow-hidden"
    >
      <div className="ribbon-track">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 text-sm tracking-[0.18em] uppercase text-ink/70"
          >
            <span
              aria-hidden="true"
              className="size-1.5 rounded-sm bg-sea"
            />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
