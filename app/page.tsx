import { Suspense } from 'react';
import HomeClient from "./Home";
import { analyzeUser } from "./actions";

export default function Home() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading Git Scout...</div>}>
      <DefaultReportLoader />
    </Suspense>
  );
}

async function DefaultReportLoader() {
  const defaultReport = await analyzeUser("presidenttree94");
  return <HomeClient defaultReport={defaultReport} />;
}