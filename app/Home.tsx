"use client";
import { useState } from "react";
import Search from "@/components/Search";
import Report from "@/components/Report";
import { ReportData } from "@/types/ReportData";

const steps = [
  { icon: "ri-user-search-line", title: "Paste a username", text: "Grab it from the resume or LinkedIn. Full profile URLs work too." },
  { icon: "ri-bar-chart-box-line", title: "We read the public record", text: "Repos, stars, languages, recency, docs and licenses — pulled live from GitHub." },
  { icon: "ri-chat-check-line", title: "Get interview-ready notes", text: "A banded signal, a confidence level, and the evidence behind every line — click any finding to see it." }
];

export default function HomeClient({ defaultReport }: { defaultReport: ReportData; }) {
  const [report, setReport] = useState(defaultReport);
  return (
    <main>
      <section id="evaluate" className="bg-background-100">
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] items-center gap-8">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 text-xs font-label bg-accent-100 text-accent-700 px-3 py-1 rounded-full"><i className="ri-shield-check-line"></i>No candidate score. Just evidence.</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl">Read a developer's GitHub <i className="text-primary-600">like an engineer would.</i></h1>
            <p className="md:text-lg lg:max-w-xl text-foreground-700">Paste a candidate's username. GitSift reads their public repos and gives you a banded signal, a confidence level, and the evidence behind every finding — plus an honest list of what it could not see.</p>
            <Search setReport={setReport} />
          </div>
          <div className="pl-8 w-full justify-self-center">
            <div className="relative">
              <img src="./hero.jpg" className="w-full aspect-square sm:aspect-video md:aspect-auto md:h-[460px] object-cover object-[50%_25%] rounded-3xl" />
              <div className="absolute -left-8 bottom-10 bg-background-50 p-4 shadow-xl rounded-2xl text-foreground-500">
                <p className="font-label text-xs uppercase tracking-widest">Public code signal</p>
                <p className="font-heading text-2xl font-bold text-primary-600 mt-1 mb-2">Strong</p>
                <div className="flex items-center gap-2 font-label text-xs">
                  <span>Confidence</span>
                  <div className="flex gap-1">
                    <span className="h-1.5 w-4 rounded-full bg-primary-600"></span>
                    <span className="h-1.5 w-4 rounded-full bg-primary-600"></span>
                    <span className="h-1.5 w-4 rounded-full bg-primary-600"></span>
                  </div>
                  <span>High</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Report report={report} />
      <section id="how-it-works" className="bg-primary-700">
        <div>
          <h2 className="text-3xl md:text-4xl max-w-xl text-background-50">No engineering degree required to screen engineers.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 mb-8">
            {steps.map((s, index) => (
              <div key={index} className="bg-primary-800 p-6 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div className="bg-[oklch(.8_.16_70)] h-12 w-12 rounded-xl flex items-center justify-center text-2xl"><i className={s.icon}></i></div>
                  <span className="font-label text-sm text-primary-300">0{index + 1}</span>
                </div>
                <h3 className="text-background-50 mt-5 mb-2">{s.title}</h3>
                <p className="text-sm text-primary-100">{s.text}</p>
              </div>
            ))}
          </div>
          <p className="font-label text-xs text-primary-300">Note: GitHub only shows public work. Many great engineers code in private company repos — every report says what it could not see, and a thin profile means "not enough evidence", never "weak candidate".</p>
        </div>
      </section>
    </main>
  );
}