'use client';

import { motion } from 'framer-motion';
import ScooterCard from '@/components/ui/ScooterCard';
import { useInView } from 'react-intersection-observer';

const scooters = [
  {
    id: '1',
    name: 'RAZER STORM PRO',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&auto=format&fit=crop',
    speed: '100 km/h',
    range: '80 km',
    power: '3500W',
    isNew: true,
  },
  {
    id: '2',
    name: 'NIGHT FURY ELITE',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&auto=format&fit=crop',
    speed: '120 km/h',
    range: '100 km',
    power: '5000W',
    isNew: true,
    isLimited: true,
  },
  {
    id: '3',
    name: 'CYBER BLADE',
    price: 2799,
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&auto=format&fit=crop',
    speed: '90 km/h',
    range: '70 km',
    power: '3000W',
  },
  {
    id: '4',
    name: 'THUNDER X',
    price: 3999,
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&auto=format&fit=crop',
    speed: '140 km/h',
    range: '120 km',
    power: '6000W',
    isLimited: true,
  },
];

export default function FeaturedScooters() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-24 bg-razer-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            MODELET{' '}
            <span className="razer-gradient">FLAGSHIP</span>
          </h2>
          <p className="text-gray-400">
            Zgjidhni skuterin që i përshtatet stilit tuaj të jetesës
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scooters.map((scooter, index) => (
            <ScooterCard key={scooter.id} {...scooter} />
          ))}
        </div>
      </div>
    </section>
  );
}