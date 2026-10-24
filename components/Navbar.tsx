import Link from "next/link";

const nav = [
  { text: "Evaluate", link: "#evaluate" },
  { text: "Report", link: "#report" },
  { text: "How it works", link: "#how-it-works" }
];

export default function Navbar() {
  return (
    <header className="sticky top-0 bg-report/90 border-b border-[oklch(.93_.016_85)] backdrop-blur z-1">
      <div className="flex justify-between items-center px-10">
        <div className="h-16 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center text-xl text-report"><i className="ri-search-eye-line"></i></div>
            <span className="font-heading text-xl font-bold text-dark">GitSift</span>
          </Link>
        </div>
        <nav className="text-foreground-dark font-label text-sm flex gap-8">
          {nav.map((n, index) => (
            <a key={index} href={n.link} className="hover:text-primary">{n.text}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}