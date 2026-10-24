import Checklist from "@/components/Checklist";

const steps = [
  { icon: "ri-user-search-line", title: "Paste a username", text: "Grab it from the resume or LinkedIn. Full profile URLs work too." },
  { icon: "ri-bar-chart-box-line", title: "We read the public record", text: "Repos, stars, languages, recency, docs and licenses — pulled live from GitHub." },
  { icon: "ri-chat-check-line", title: "Get interview-ready notes", text: "A banded signal, a confidence level, and the evidence behind every line — click any finding to see it." }
];

export default async function Home() {

  const cards = [
    { number: 0, text: "Stars earned" },
    { number: 0, text: "Followers" },
    { number: 0, text: "Something" },
    { number: 0, text: "Something" }
  ];

  const signalChecklist = [
    { checked: false, title: "Something", context: "Some context" },
    { checked: false, title: "Something", context: "Some context" },
    { checked: false, title: "Something", context: "Some context" },
    { checked: false, title: "Something", context: "Some context" }
  ]

  const confidenceChecklist = [
    { checked: false, title: "Something", context: "Some context" },
    { checked: false, title: "Something", context: "Some context" },
    { checked: false, title: "Something", context: "Some context" },
    { checked: false, title: "Something", context: "Some context" }
  ];

  let signal, signalDescription, confidence, confidenceDescription;

  switch (signalChecklist.filter(item => item.checked).length) {
    case 4:
      signal = "Strong";
      signalDescription = "Depth, more than one project, documentation and recent activity all agree. Still read the projects below before the interview.";
      break;
    case 3:
      signal = "Moderate";
      signalDescription = "Real public evidence, but not a pattern yet. Pair it with a code walkthrough or take-home — and read the missing check below before deciding.";
      break;
    case 2:
    case 1:
      signal = "Thin";
      signalDescription = "Very little public code. That is normal early in a career and normal for engineers whose work sits behind a firewall. Ask for a private repo, portfolio, or take-home.";
      break;
    default:
      signal = "No public data";
      signalDescription = "No public repositories, so no conclusion is drawn. Ask for work samples rather than reading anything into it."
      break;
  }

  const confidenceLength = confidenceChecklist.filter(item => item.checked).length;
  switch (confidenceLength) {
    case 4:
      confidence = "High";
      confidenceDescription = "Enough public record — in size, span and staying power — that the band rests on a real sample rather than one lucky repo.";
      break;
    case 3:
      confidence = "Medium";
      confidenceDescription = "A real but narrow record. The band is readable, though it comes from a small sample."
      break;
    default:
      confidence = "Low";
      confidenceDescription = "Very little public record to sample. Whatever the band says, it rests on almost nothing."
      break;
  }

  return (
    <main>
      <section id="evaluate" className="bg-evaluate">
        <div className="grid grid-cols-[1.25fr_1fr] items-center gap-10">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 text-xs font-label bg-accent-light text-accent-dark px-3 py-1 rounded-full"><i className="ri-shield-check-line"></i>No candidate score. Just evidence.</span>
            <h1 className="text-6xl">Read a developer's GitHub <i className="text-primary">like an engineer would.</i></h1>
            <p className="text-lg max-w-xl text-foreground-dark">Paste a candidate's username. GitSift reads their public repos and gives you a banded signal, a confidence level, and the evidence behind every finding — plus an honest list of what it could not see.</p>
            <form className="flex max-w-xl bg-report p-1.5 rounded-full border border-[oklch(.88_.02_85)] mt-8">
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
      <section id="report" className="bg-report">
        <div>
          <p className="font-label text-xs uppercase tracking-widest text-accent-mid">Candidate report</p>
          <h2 className="text-4xl my-2">Username</h2>
          <p className="text-foreground-dark">Two questions, answered separately: how strong is the public evidence, and how much of it is there?</p>
          <article className="grid grid-cols-[340px_1fr] gap-6 mt-8">
            <aside className="bg-dark text-report p-7 rounded-3xl sticky top-24 h-fit">
              <div className="flex items-center gap-4 mb-4">
                <img src="https://placehold.co/64" className="h-16 w-16 rounded-full" />
                <div>
                  <p className="font-heading text-xl font-bold">Username</p>
                  <a className="font-label text-xs text-[oklch(.85_.14_75)]">@username</a>
                </div>
              </div>
              <p className="text-sm text-[oklch(.84_.008_160)]">Bio goes here.</p>
              <div className="mt-3 mb-6 text-xs space-y-1">
                <p className="flex items-center gap-2 text-[oklch(.74_.01_160)]"><i className="ri-map-pin-line"></i>Location</p>
                {/*Other details*/}
                <p className="flex items-center gap-2 text-[oklch(.62_.012_160)]"><i className="ri-history-line"></i>Last public push</p>
              </div>
              <div className="rounded-2xl border-l-4 border-[oklch(.44_.014_160)] p-4 bg-[oklch(.22_.01_160)]">
                <p className="font-label text-xs uppercase tracking-widest text-[oklch(.62_.012_160)]">Public code signal</p>
                <p className="mt-1 mb-3 font-heading font-bold text-2xl text-[oklch(.74_.01_160)]">{signal}</p>
                <div className="flex items-center gap-2 font-label text-xs">
                  <span className="text-[oklch(.62_.012_160)]">Confidence</span>
                  <div className="flex gap-1">
                    <span className="h-1.5 w-4 rounded-full bg-report"></span>
                    <span className={`h-1.5 w-4 rounded-full ${confidenceLength > 2 ? "bg-report" : "bg-[oklch(.37_.014_160)]"}`}></span>
                    <span className={`h-1.5 w-4 rounded-full ${confidenceLength === 4 ? "bg-report" : "bg-[oklch(.37_.014_160)]"}`}></span>
                  </div>
                  <span>{confidence}</span>
                </div>
              </div>
              <div className="mt-5 mb-6 grid grid-cols-2 gap-3">
                {cards.map((c, index) => (
                  <div key={index} className="bg-[oklch(.22_.01_160)] p-3 rounded-xl">
                    <p className="font-heading text-xl font-bold">{c.number}</p>
                    <p className="font-label text-xs text-[oklch(.62_.012_160)]">{c.text}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="font-label text-xs text-[oklch(.62_.012_160)]">Languages in public repos</p>
                <div className="flex h-2 w-full overflow-hidden rounded-full bg-[oklch(.29_.012_160)] mt-2 mb-3">
                  <div className="bg-report w-1/2"></div>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-report"></span>
                    <span className="text-xs text-[oklch(.84_.008_160)]">Lang 50%</span>
                  </div>
                </div>
              </div>
            </aside>
            <div className="space-y-6">
              <div className="bg-evaluate p-7 rounded-3xl border border-[oklch(.93_.016_85)]">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl">Signal & confidence</h3>
                  <p className="font-label text-xs text-[oklch(.52_.014_160)]">Banded read — not a score</p>
                </div>
                <div className="grid grid-cols-2 divide-x divide-[oklch(.93_.016_85)] mt-5 mb-6">
                  <Checklist
                    className="pr-6"
                    heading="How good is the work"
                    top={<div className="flex flex-wrap gap-1.5 my-3 text-xs font-label">
                      <span className="bg-[oklch(.93_.016_85)] text-[oklch(.52_.014_160)] px-2.5 py-1 rounded-full">Strong</span>
                      <span className="bg-[oklch(.93_.016_85)] text-[oklch(.52_.014_160)] px-2.5 py-1 rounded-full">Moderate</span>
                      <span className="bg-[oklch(.93_.016_85)] text-[oklch(.52_.014_160)] px-2.5 py-1 rounded-full">Thin</span>
                      <span className="bg-[oklch(.93_.016_85)] text-[oklch(.52_.014_160)] px-2.5 py-1 rounded-full">No public data</span>
                    </div>}
                    description={signalDescription}
                    list={signalChecklist}
                  />
                  <Checklist
                    className="pl-6"
                    heading="How sure we are"
                    top={<div className="flex items-center gap-3">
                      <span className="font-heading text-2xl font-bold my-2">{confidence}</span>
                      <div className="flex gap-1">
                        <span className="h-2 w-6 rounded-full bg-[oklch(.29_.012_160)]"></span>
                        <span className={`h-2 w-6 rounded-full ${confidenceLength > 2 ? "bg-[oklch(.29_.012_160)]" : "bg-[oklch(.88_.02_85)]"}`}></span>
                        <span className={`h-2 w-6 rounded-full ${confidenceLength === 4 ? "bg-[oklch(.29_.012_160)]" : "bg-[oklch(.88_.02_85)]"}`}></span>
                      </div>
                    </div>}
                    description={confidenceDescription}
                    list={confidenceChecklist}
                  />
                </div>
                <div className="rounded-2xl bg-report border border-[oklch(.93_.016_85)] p-4">
                  <p className="flex items-center gap-2 font-label text-xs uppercase tracking-widest text-[oklch(.52_.014_160)]"><i className="ri-eye-off-line"></i>What this report cannot see</p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 mt-2 text-xs text-[oklch(.37_.014_160)]">
                    <p>Private and company code — most senior engineers keep their best work behind a firewall.</p>
                    <p>Work tracked outside GitHub: GitLab, Bitbucket, Gerrit, internal monorepos.</p>
                    <p>Non-code contributions: reviews, design docs, mentoring, on-call.</p>
                    <p>Commit activity inside forked repositories.</p>
                  </div>
                </div>
              </div>
              <div className="bg-evaluate p-7 rounded-3xl border border-[oklch(.93_.016_85)]">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl">What we actually found</h3>
                  <p className="font-label text-xs text-[oklch(.52_.014_160)]">Open any line to see the evidence</p>
                </div>
                <article className="flex flex-col divide-y divide-[oklch(.925_.016_85)] mt-4">
                  <div>Recent public activity</div>
                  <div>Reach of the work</div>
                  <div>How they present projects</div>
                  <div>Work in other people's code</div>
                  <div>What they reach for</div>
                </article>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl p-6 border bg-[oklch(.97_.02_155)] border-[oklch(.93_.045_155)]">
                  <h3 className="flex items-center gap-2 text-lg text-[oklch(.33_.08_155)]">
                    <i className="ri-checkbox-circle-line"></i>
                    Positive signals
                  </h3>
                  <ul></ul>
                </div>
                <div className="rounded-3xl p-6 border bg-[oklch(.97_.01_25)] border-[oklch(.93_.03_25)]">
                  <h3 className="flex items-center gap-2 text-lg text-[oklch(.36_.1_25)]">
                    <i className="ri-question-line"></i>
                    Worth asking about
                  </h3>
                  <p className="text-xs text-[oklch(.52_.014_160)] mt-1">Questions for the interview — not disqualifiers.</p>
                  <ul></ul>
                </div>
              </div>
              <div>
                <h3 className="text-xl">Notable repositories</h3>
                <p className="font-label text-xs text-[oklch(.52_.014_160)] mt-1 mb-4">Pinned projects are displayed first, followed by those that are popular or well-maintained.</p>
                <article className="grid grid-cols-2 gap-4">
                  <a className="bg-[oklch(.97_.012_85)] rounded-2xl border border-[oklch(.93_.016_85)] p-5">
                    <h4 className="font-label text-sm font-semibold text-[oklch(.4_.1_155)]">project-title</h4>
                    <p className="mt-2 mb-4 text-sm line-clamp-2 text-[oklch(.44_.014_160)]">Project description</p>
                    <div className="flex items-center gap-4 font-label text-xs text-[oklch(.52_.014_160)]">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[oklch(.74_.16_65)]"></span>
                        <span>Language</span>
                      </div>
                      <span className="flex items-center gap-1"><i className="ri-star-line"></i>0</span>
                      <span className="flex items-center gap-1"><i className="ri-git-fork-line"></i>0</span>
                      <span>Updated Mon Year</span>
                    </div>
                  </a>
                </article>
              </div>
            </div>
          </article>
        </div>
      </section>
      <section id="how-it-works" className="bg-[oklch(.4_.1_155)]">
        <div>
          <h2 className="text-4xl max-w-xl text-report">No engineering degree required to screen engineers.</h2>
          <div className="grid grid-cols-3 gap-6 mt-10 mb-8">
            {steps.map((s, index) => (
              <div key={index} className="bg-[oklch(.33_.08_155)] p-6 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div className="bg-[oklch(.8_.16_70)] h-12 w-12 rounded-xl flex items-center justify-center text-2xl"><i className={s.icon}></i></div>
                  <span className="font-label text-sm text-[oklch(.77_.11_155)]">0{index + 1}</span>
                </div>
                <h3 className="text-report mt-5 mb-2">{s.title}</h3>
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
