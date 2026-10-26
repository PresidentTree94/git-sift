import HomeClient from "./Home";
import { analyzeUser } from "./actions";

export default async function Home() {
  const defaultReport = await analyzeUser("presidenttree94");
  return (
    <HomeClient defaultReport={defaultReport} />
  );
}