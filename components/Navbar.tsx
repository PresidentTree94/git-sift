const nav = [
  { text: "Evaluate", link: "#evaluate" },
  { text: "Report", link: "#report" },
  { text: "How it works", link: "#how-it-works" }
];

export default function Navbar() {
  return (
    <header>
      <div className="flex justify-between items-center">
        <div>Logo</div>
        <nav>
          {nav.map((n, index) => (
            <a key={index} href={n.link}>{n.text}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}