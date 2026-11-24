import Header from "./components/Header";
import CaseStudies from "./components/CaseStudies";
import Cta from "./components/Cta";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Process from "./components/Process";
import Services from "./components/Services";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <CaseStudies />
        <Services />
        <Process />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
