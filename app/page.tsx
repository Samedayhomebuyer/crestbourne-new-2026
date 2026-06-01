import Nav from "@/components/Nav";
import Ticker from "@/components/Ticker";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import RecentlyAcquired from "@/components/RecentlyAcquired";
import Portfolio from "@/components/Portfolio";
import TrackRecord from "@/components/TrackRecord";
import Approach from "@/components/Approach";
import GroupStructure from "@/components/GroupStructure";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getRecentlyAcquired, getPortfolioProperties, pickRandom } from "@/lib/data/properties";
import { CATEGORY_LABELS } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [{ cards }, { properties, filterCounts }] = await Promise.all([
    getRecentlyAcquired(),
    getPortfolioProperties(),
  ]);

  const tickerItems = pickRandom(properties, 6).map((p) => ({
    id: p.id,
    tag: p.tag ?? CATEGORY_LABELS[p.category].split(/[\s-]/)[0].toUpperCase(),
    text: p.title,
  }));

  return (
    <>
      <Nav />
      <Ticker items={tickerItems} />
      <Hero />
      <Partners />
      <RecentlyAcquired cards={cards} />
      <Portfolio initialProperties={properties} filterCounts={filterCounts} />
      <TrackRecord />
      <Approach />
      <GroupStructure />
      <Contact />
      <Footer />
    </>
  );
}
