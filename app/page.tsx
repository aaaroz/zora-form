import FeaturesSection from "@/components/landing-page/features";
import HeroSection from "@/components/landing-page/hero";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/globals/container";
import { Navbar } from "@/components/layout/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Container>
          <div className="mt-16 md:mt-24">
            <HeroSection />
          </div>
          <div className="mt-24 p-5">
            <FeaturesSection />
          </div>
        </Container>
      </main>
      <Footer isScrollable />
    </>
  );
}
