const steps = [
  { icon: "ri-user-search-line", title: "Paste a username", text: "Grab it from the resume or LinkedIn. Full profile URLs work too." },
  { icon: "ri-bar-chart-box-line", title: "We read the public record", text: "Repos, stars, languages, recency, docs and licenses — pulled live from GitHub." },
  { icon: "ri-chat-check-line", title: "Get interview-ready notes", text: "A banded signal, a confidence level, and the evidence behind every line — click any finding to see it." }
];

export default function Home() {
  return (
    <main>
      <section id="evaluate" className="bg-evaluate px-10 py-20">
        <div className="grid grid-cols-[1.25fr_1fr] items-center gap-10 max-w-7xl mx-auto">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 text-xs font-label bg-accent-light text-accent-dark px-3 py-1 rounded-full"><i className="ri-flashlight-line"></i>Screening in under 10 seconds</span>
            <h1 className="text-6xl">Read a developer's GitHub <i className="text-primary">like an engineer would.</i></h1>
            <p className="text-lg max-w-xl text-foreground-dark">Paste a candidate's username. GitScout reads their public repos and tells you how strong the evidence looks, how confident you should be, and what to ask in the interview.</p>
            <form className="flex max-w-xl bg-report p-1.5 rounded-full border border-border mt-8">
              <div className="flex-1 flex items-center gap-2 px-4">
                <i className="ri-github-fill text-xl text-foreground-light"></i>
                <input type="text" placeholder="username or github.com/username" className="w-full text-sm py-3 outline-none" />
              </div>
              <button className="bg-primary text-report px-6 py-3 rounded-full text-sm font-semibold">Evaluate</button>
            </form>
          </div>
          <div className="relative">
            <img src="https://public.readdy.ai/ai/img_res/92882e8abd631a3437ce9d71816172f1.jpg" className="w-full h-[460px] object-cover rounded-3xl object-top" />
            <div className="absolute -left-8 bottom-10 bg-report p-4 shadow-xl rounded-2xl text-foreground-light">
              <p className="font-label text-xs uppercase tracking-widest">Public code signal</p>
              <p className="font-heading text-2xl font-bold text-primary mt-1 mb-2">Strong</p>
              <div className="flex items-center gap-2 font-label text-xs">
                <span>Confidence</span>
                <div className="flex gap-1">
                  <span className="h-1.5 w-4 rounded-full bg-primary"></span>
                  <span className="h-1.5 w-4 rounded-full bg-primary"></span>
                  <span className="h-1.5 w-4 rounded-full bg-primary"></span>
                </div>
                <span>High</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="report" className="bg-report px-10 py-20">
        <div className="max-w-7xl mx-auto">
          <p className="font-label text-xs uppercase tracking-widest text-accent-mid">Candidate report</p>
          <h2 className="text-4xl my-2">Username</h2>
          <p className="text-foreground-dark">Two questions, answered separately: how strong is the public evidence, and how much of it is there?</p>
          <article className="grid grid-cols-[340px_1fr] gap-6 mt-8">
            <aside className="bg-dark text-report p-7 rounded-3xl">
              <div className="flex items-center gap-4">
                <img src="https://placehold.co/64" className="h-16 w-16 rounded-full" />
                <div>
                  <p className="font-heading text-xl font-bold">Username</p>
                  <a className="font-label text-xs">@username</a>
                </div>
              </div>
              <p>Bio</p>
              <div>GitHub sidebar</div>
              <div>Signal</div>
              <div>Cards</div>
              <div>Languages</div>
            </aside>
            <div>
              <div>Signal & confidence</div>
              <div>What we actually found</div>
              <div>Positive signals/Worth asking about</div>
              <div>Pinned repos</div>
            </div>
          </article>
        </div>
      </section>
      <section id="how-it-works" className="bg-[oklch(.4_.1_155)] px-10 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl max-w-xl text-report">No engineering degree required to screen engineers.</h2>
          <div className="grid grid-cols-3 gap-6 mt-10 mb-8">
            {steps.map((s, index) => (
              <div key={index} className="bg-[oklch(.33_.08_155)] p-6 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div className="bg-[oklch(.8_.16_70)] h-12 w-12 rounded-xl flex items-center justify-center text-2xl"><i className={s.icon}></i></div>
                  <span className="font-label text-sm text-[oklch(.77_.11_155)]">0{index + 1}</span>
                </div>
                <h3 className="text-report text-xl mt-5 mb-2">{s.title}</h3>
                <p className="text-sm text-[oklch(.93_.045_155)]">{s.text}</p>
              </div>
            ))}
          </div>
          <p className="font-label text-xs text-[oklch(.86_.08_155)]">Note: GitHub only shows public work. Many great engineers code in private company repos — every report says what it could not see, and a thin profile means "not enough evidence", never "weak candidate".</p>
        </div>
      </section>
    </main>
  );
}
