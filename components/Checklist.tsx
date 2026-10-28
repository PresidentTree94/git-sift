export default function Checklist({ className, heading, top, description, list }: {
  className: string;
  heading: string;
  top: React.ReactNode;
  description: string;
  list: { checked: boolean; title: string; context: string; }[];
}) {
  return (
    <div className={className}>
      <p className="font-label text-xs uppercase tracking-widest text-foreground-500">{heading}</p>
      {top}
      <p className="text-sm text-foreground-800">{description}</p>
      <ul className="mt-3 space-y-1.5">
        {list.map((l, index) => (
          <li key={index} className="flex items-center gap-2">
            <i className={l.checked ? "ri-checkbox-circle-fill text-primary-600" : "ri-checkbox-blank-circle-line text-foreground-400"}></i>
            <div className="text-xs">
              <p className={`font-semibold ${l.checked ? "text-foreground-900" : "text-foreground-600"}`}>{l.title}</p>
              <p className="text-foreground-400">{l.context}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}