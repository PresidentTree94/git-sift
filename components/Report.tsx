import Checklist from "./Checklist";
import { ReportData } from "@/types/ReportData";
import { getSignalData } from "@/utils/signalData";
import { getConfidenceData } from "@/utils/confidenceData";

const LANG_COLORS = ["bg-primary-400", "bg-accent-400", "bg-secondary-400", "bg-[oklch(.86_.08_155)]", "bg-accent-200", "bg-[oklch(.86_.06_25)]"];

function convertPush(push: string) {
  return new Date(push).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

type Criterion = {
  checked: boolean;
  title: string;
  context: string;
}

export default function Report({ report }: { report: ReportData; }) {

  const { name, username, avatar, url, bio, location, company, email, blog, repos, followers, months } = report;

  const stats = [
    { icon: "ri-map-pin-line", value: location },
    { icon: "ri-building-line", value: company },
    { icon: "ri-mail-line", value: email },
    { icon: "ri-link", value: blog },
    { icon: "ri-history-line", value: `Last public push ${convertPush(repos[0]?.pushed)}`}
  ]

  const cards = [
    { number: repos.reduce((sum, r) => sum + r.stars, 0), text: "Stars" },
    { number: followers, text: "Followers" },
    { number: repos.length, text: repos.length === 100 ? "Sample repos" : "Repos" },
    { number: Math.ceil(months / 12), text: "Years" }
  ];

  const cumulativeLanguages = repos.reduce((acc: Record<string, number>, repo) => {
    for (const [lang, bytes] of Object.entries(repo.languages)) {
      acc[lang] = (acc[lang] || 0) + Number(bytes);
    }
    return acc;
  }, {});
  
  let processedLanguages;
  const totalBytes = Object.values(cumulativeLanguages).reduce((a, b) => a + b, 0);
  const percentages = Object.entries(cumulativeLanguages).map(([language, bytes]) => ({ language, bytes, percentage: Math.round((bytes / totalBytes) * 100) })).filter(p => p.percentage > 0).sort((a, b) => b.bytes - a.bytes);
  if (percentages.length > 6) {
    const topLanguages = percentages.slice(0, 5);
    const otherBytes = percentages.slice(5).reduce((sum, p) => sum + p.bytes, 0);
    processedLanguages = [...topLanguages, { language: "Other", bytes: otherBytes, percentage: 100 - topLanguages.reduce((sum, t) => sum + t.percentage, 0) }];
  } else {
    processedLanguages = percentages;
  }

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const signalChecklist: Criterion[] = [
    { checked: repos.filter(r => r.description && r.hasReadMe).length / repos.length >= 0.75, title: "Project Standards", context: "Most projects include descriptions, READMEs, etc." },
    { checked: repos.filter(r => r.commits.length >= 7).length / repos.length >= 0.75, title: "Project Substance", context: "Most projects have at least 7 commits" },
    { checked: repos.filter(r => {
      const activityMonths: Record<string, number> = {};
      r.commits.map(c => activityMonths[convertPush(c.commit.author.date)] = activityMonths[convertPush(c.commit.author.date)] = activityMonths[convertPush(c.commit.author.date)] + 1 || 0);
      return Object.keys(activityMonths).length >= 2;
    }).length / repos.length >= 0.75, title: "Development Persistence", context: "Most projects are updated beyond creation" },
    { checked: repos.filter(r => Object.keys(r.languages).length >= 3).length / repos.length >= 0.75, title: "Technical Breadth", context: "Most projects use at least 3 languages" }
  ]

  const confidenceChecklist: Criterion[] = [
    { checked: repos.length >= 4, title: "Project Volume", context: "At least 4 public repositories" },
    { checked: repos.filter(r => new Date(r.pushed) > oneYearAgo).length > 0, title: "Activity Recency", context: "Repo updates within the last year" },
    { checked: repos.filter(r => r.commits.filter(c => c.commit.author.name === username).length / r.commits.length >= 0.75).length / repos.length >= 0.75, title: "Repo Ownership", context: "Most projects are owned by the user" },
    { checked: Boolean(name && bio && location && (email || blog || company)), title: "Profile Transparency", context: "Core profile metadata is populated" }
  ];

  const { signal, signalDescription, signalColor, signalBorder, pill } = getSignalData(signalChecklist.filter(item => item.checked).length);
  const { confidence, confidenceDescription, pills } = getConfidenceData(confidenceChecklist.filter(item => item.checked).length);

  return (
    <section id="report" className="bg-background-50">
      <div>
        <p className="font-label text-xs uppercase tracking-widest text-accent-700">Candidate report</p>
        <h2 className="text-4xl my-2">{name}</h2>
        <p className="text-foreground-700">Two questions, answered separately: how strong is the public evidence, and how much of it is there?</p>
        <article className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 mt-8">
          <aside className="bg-foreground-950 text-background-50 p-7 rounded-3xl lg:sticky top-24 h-fit">
            <div className="flex items-center gap-4 mb-4">
              <img src={avatar} className="h-16 w-16 rounded-full" />
              <div>
                <p className="font-heading text-xl font-bold">{name}</p>
                <a href={url} target="_blank" rel="noopener noreferrer" className="font-label text-xs text-accent-400 hover:underline">@{username}</a>
              </div>
            </div>
            <p className="text-sm text-foreground-200">{bio}</p>
            <div className="mt-3 mb-6 text-xs space-y-1 text-foreground-300">
              {stats.map((s, index) => (
                s.value && <p key={index} className="flex items-center gap-2"><i className={s.icon}></i>{s.value}</p>
              ))}
            </div>
            <div className={`rounded-2xl border-l-4 ${signalBorder} p-4 bg-foreground-900`}>
              <p className="font-label text-xs uppercase tracking-widest text-foreground-400">Public code signal</p>
              <p className={`mt-1 mb-3 font-heading font-bold text-2xl ${signalColor}`}>{signal}</p>
              <div className="flex items-center gap-2 font-label text-xs">
                <span className="text-foreground-400">Confidence</span>
                <div className="flex gap-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <span key={i} className={`h-1.5 w-4 rounded-full ${pills > i ? "bg-background-50" : "bg-foreground-700"}`}></span>
                  ))}
                </div>
                <span>{confidence}</span>
              </div>
            </div>
            <div className="mt-5 mb-6 grid grid-cols-2 gap-3">
              {cards.map((c, index) => (
                <div key={index} className="bg-foreground-900 p-3 rounded-xl">
                  <p className="font-heading text-xl font-bold">{c.number}</p>
                  <p className="font-label text-xs text-foreground-400">{c.text}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="font-label text-xs text-foreground-400">Languages in public repos</p>
              <div className="flex h-2 w-full overflow-hidden rounded-full bg-foreground-800 mt-2 mb-3">
                {processedLanguages.map((p, index) => (
                  <div key={p.language} className={LANG_COLORS[index] || "bg-background-50"} style={{ flex: p.bytes }}></div>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {processedLanguages.map((p, index) => (
                  <div key={index} className="flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${LANG_COLORS[index] || "bg-background-50"}`}></span>
                    <span className="text-xs text-foreground-200">{p.language} {p.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
          <div className="space-y-6 @container">
            <div className="bg-background-100 p-7 rounded-3xl border border-background-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <h3 className="text-xl">Signal & confidence</h3>
                <p className="font-label text-xs text-foreground-500">Banded read — not a score</p>
              </div>
              <div className="grid @min-[765px]:grid-cols-2 divide-y @min-[765px]:divide-y-0 @min-[765px]:divide-x divide-background-200 mt-5 mb-6">
                <Checklist
                  className="pb-6 @min-[765px]:pb-0 @min-[765px]:pr-6"
                  heading="How good is the work"
                  top={<div className="flex flex-wrap gap-1.5 my-3 text-xs font-label">
                    {["Strong", "Moderate", "Thin", "No public data"].map((d, index) => (
                      <span key={index} className={`${signal === d ? `${pill} font-semibold` : "bg-background-200 text-foreground-500"} px-2.5 py-1 rounded-full`}>{d}</span>
                    ))}
                  </div>}
                  description={signalDescription}
                  list={signalChecklist}
                />
                <Checklist
                  className="pt-6 @min-[765px]:pt-0 @min-[765px]:pl-6"
                  heading="How sure we are"
                  top={<div className="flex items-center gap-3">
                    <span className="font-heading text-2xl font-bold my-2">{confidence}</span>
                    <div className="flex gap-1">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <span key={i} className={`h-2 w-6 rounded-full ${pills > i ? "bg-foreground-800" : "bg-[oklch(.88_.02_85)]"}`}></span>
                      ))}
                    </div>
                  </div>}
                  description={confidenceDescription}
                  list={confidenceChecklist}
                />
              </div>
              <div className="rounded-2xl bg-background-50 border border-background-200 p-4">
                <p className="flex items-center gap-2 font-label text-xs uppercase tracking-widest text-foreground-500"><i className="ri-eye-off-line"></i>What this report cannot see</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 text-xs text-foreground-700">
                  <p>Private and company code — most senior engineers keep their best work behind a firewall.</p>
                  <p>Work tracked outside GitHub: GitLab, Bitbucket, Gerrit, internal monorepos.</p>
                  <p>Non-code contributions: reviews, design docs, mentoring, on-call.</p>
                  <p>Commit activity inside forked repositories.</p>
                </div>
              </div>
            </div>
            <div className="bg-background-100 p-7 rounded-3xl border border-background-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <h3 className="text-xl">What we actually found</h3>
                <p className="font-label text-xs text-foreground-500">Open any line to see the evidence</p>
              </div>
              <article className="flex flex-col divide-y divide-[oklch(.925_.016_85)] mt-4">
                <p>Not available yet.</p>
                {/*<div>Recent public activity</div>
                <div>Reach of the work</div>
                <div>How they present projects</div>
                <div>Work in other people's code</div>
                <div>What they reach for</div>*/}
              </article>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-3xl p-6 border bg-primary-50 border-primary-100">
                <h3 className="flex items-center gap-2 text-lg text-primary-800">
                  <i className="ri-checkbox-circle-line"></i>
                  Positive signals
                </h3>
                {/*<ul></ul>*/}
                <p>Not available yet.</p>
              </div>
              <div className="rounded-3xl p-6 border bg-secondary-50 border-secondary-100">
                <h3 className="flex items-center gap-2 text-lg text-secondary-800">
                  <i className="ri-question-line"></i>
                  Worth asking about
                </h3>
                <p className="text-xs text-foreground-500 mt-1">Questions for the interview — not disqualifiers.</p>
                {/*<ul></ul>*/}
                <p>Not available yet.</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl">Notable repositories</h3>
              <p className="font-label text-xs text-foreground-500 mt-1 mb-4">Most recent projects are displayed. May be subject to change.</p>
              <article className="grid grid-cols-1 @2xl:grid-cols-2 gap-4">
                {repos.slice(0, 6).map(r => (
                  <a key={r.url} href={r.url} className="group bg-background-100 rounded-2xl border border-background-200 hover:border-primary-400 p-5 flex flex-col">
                    <h4 className="font-label text-sm font-semibold text-primary-600 group-hover:underline">{r.title}</h4>
                    <p className="mt-2 mb-4 text-sm line-clamp-2 text-foreground-600 flex-1">{r.description}</p>
                    <div className="flex items-center gap-4 font-label text-xs text-foreground-500">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[oklch(.74_.16_65)]"></span>
                        <span>{Object.keys(r.languages)[0]}</span>
                      </div>
                      <span className="flex items-center gap-1"><i className="ri-star-line"></i>{r.stars}</span>
                      <span className="flex items-center gap-1"><i className="ri-git-fork-line"></i>{r.forks}</span>
                      <span>Updated {convertPush(r.pushed)}</span>
                    </div>
                  </a>
                ))}
              </article>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}