import Hero from '@/components/sections/Hero';
import ServiceSection from '@/components/sections/ServiceSection';
import FeaturedScooters from '@/components/sections/FeaturedScooters';

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <FeaturedScooters />
      <ServiceSection />
    </main>
  );
}