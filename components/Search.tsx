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
    const reportElement = document.getElementById("report");
    if (reportElement) {
      reportElement.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex lg:max-w-xl bg-background-50 p-1.5 rounded-full border border-background-200 mt-8">
      <div className="flex-1 flex items-center gap-2 px-4">
        <i className="ri-github-fill text-xl text-foreground-500"></i>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username or https://github.com/username" className="w-full text-sm py-3 outline-none" />
      </div>
      <button className="bg-primary-600 text-background-50 px-6 py-3 rounded-full text-sm font-semibold">Evaluate</button>
    </form>
  );
}