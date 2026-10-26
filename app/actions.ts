"use server";
import { buildReport } from "@/lib/analysis";

export async function analyzeUser(username: string) {
  return await buildReport(username);
}