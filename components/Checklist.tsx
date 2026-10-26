export default function Checklist({ className, heading, top, description, list }: {
  className: string;
  heading: string;
  top: React.ReactNode;
  description: string;
  list: { checked: boolean; title: string; context: string; }[];
}) {
  return (
    <div className={className}>
      <p className="font-label text-xs uppercase tracking-widest text-[oklch(.52_.014_160)]">{heading}</p>
      {top}
      <p className="text-sm text-[oklch(.29_.012_160)]">{description}</p>
      <ul className="mt-3 space-y-1.5">
        {list.map((l, index) => (
          <li key={index} className="flex items-center gap-2">
            <i className={l.checked ? "ri-checkbox-circle-fill text-primary" : "ri-checkbox-blank-circle-line text-[oklch(.62_.012_160)]"}></i>
            <div className="text-xs">
              <p className={`font-semibold ${l.checked ? "text-[oklch(.22_.01_160)]" : "text-[oklch(.44_.014_160)]"}`}>{l.title}</p>
              <p className="text-[oklch(.62_.012_160)]">{l.context}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}