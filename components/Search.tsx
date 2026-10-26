import { useState } from "react";
import { analyzeUser } from "@/app/actions";
import { ReportData } from "@/types/ReportData";

export default function Search({ setReport }: { setReport: React.Dispatch<React.SetStateAction<ReportData>>; }) {
  const [username, setUsername] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleaned = username.replace("https://github.com/", "").trim();
    const data = await analyzeUser(cleaned);
    setReport(data);
  }

  return (
    <form onSubmit={handleSubmit} className="flex lg:max-w-xl bg-report p-1.5 rounded-full border border-[oklch(.88_.02_85)] mt-8">
      <div className="flex-1 flex items-center gap-2 px-4">
        <i className="ri-github-fill text-xl text-foreground-light"></i>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username or https://github.com/username" className="w-full text-sm py-3 outline-none" />
      </div>
      <button className="bg-primary text-report px-6 py-3 rounded-full text-sm font-semibold">Evaluate</button>
    </form>
  );
}