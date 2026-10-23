export default function Home() {
  return (
    <main>
      <section id="evaluate" className="bg-evaluate">
        <div className="grid grid-cols-[1.25fr_1fr] items-center gap-10 max-w-7xl mx-auto px-10 py-20">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 text-xs font-label bg-accent-light text-accent-dark px-3 py-1 rounded-full"><i className="ri-flashlight-line"></i>Screening in under 10 seconds</span>
            <h1 className="font-heading text-6xl font-bold">Read a developer's GitHub <i className="text-primary">like an engineer would.</i></h1>
            <p className="text-lg max-w-xl text-foreground-dark">Paste a candidate's username. GitScout reads their public repos and tells you how strong the evidence looks, how confident you should be, and what to ask in the interview.</p>
            <form className="flex max-w-xl bg-report p-1.5 rounded-full border border-border">
              <div className="flex-1 flex items-center gap-2 px-4">
                <i className="ri-github-fill text-xl text-foreground-light"></i>
                <input type="text" placeholder="username or github.com/username" className="w-full text-sm py-3" />
              </div>
              <button className="bg-primary text-report px-6 py-3 rounded-full text-sm font-semibold">Evaluate</button>
            </form>
          </div>
          <div className="relative">
            <img src="https://public.readdy.ai/ai/img_res/92882e8abd631a3437ce9d71816172f1.jpg" className="w-full h-[460px] object-cover rounded-3xl" />
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
      <section id="report" className="">Report</section>
      <section id="how-it-works" className="">How it works</section>
    </main>
  );
}
