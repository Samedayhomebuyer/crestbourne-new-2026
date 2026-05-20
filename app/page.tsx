import Nav from "@/components/Nav";
import Ticker from "@/components/Ticker";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import RecentlyAcquired from "@/components/RecentlyAcquired";
import Portfolio from "@/components/Portfolio";
import Gallery from "@/components/Gallery";
import TrackRecord from "@/components/TrackRecord";
import Approach from "@/components/Approach";
import GroupStructure from "@/components/GroupStructure";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Ticker />
      <Hero />
      <Partners />
      <RecentlyAcquired />
      <Portfolio />
      {/* <Gallery /> */}
      <TrackRecord />
      <Approach />
      <GroupStructure />
      <Contact />
      <Footer />
    </>
  );
}
