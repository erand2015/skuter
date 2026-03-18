'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Wrench, Zap, Shield, Clock, Star, Settings } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: Wrench,
    title: 'DIAGNOSTIKIM I AVANCUAR',
    desc: 'Sistem kompjuterik për diagnostikim të plotë',
    color: 'from-razer-green to-razer-cyan'
  },
  {
    icon: Zap,
    title: 'OPTIMIZIM PERFORMANCE',
    desc: 'Rritje e shpejtësisë dhe fuqisë së baterisë',
    color: 'from-razer-cyan to-razer-green'
  },
  {
    icon: Shield,
    title: 'GARANCI E ZGJATUR',
    desc: 'Deri në 2 vite garanci për çdo servis',
    color: 'from-razer-green to-razer-cyan'
  },
  {
    icon: Settings,
    title: 'PJESË ORIGJINALE',
    desc: 'Vetëm pjesë të certifikuara dhe origjinale',
    color: 'from-razer-cyan to-razer-green'
  }
];

export default function ServiceSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-razer-black to-razer-dark relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #44d62c 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-razer-green/10 border border-razer-green/30 rounded-full px-4 py-2 mb-4">
            <Star className="w-4 h-4 text-razer-green" />
            <span className="text-sm text-razer-green">SERVIS PROFESIONAL</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            SERVISI YNË{' '}
            <span className="razer-gradient">ELITE</span>
          </h2>
          
          <p className="text-gray-400 text-lg">
            Teknikët tanë të certifikuar janë të gatshëm 24/7 për të mbajtur skuterin tuaj 
            në performancë maksimale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-razer-dark/50 backdrop-blur-sm border border-razer-green/20 rounded-xl p-6 hover:border-razer-green transition-all overflow-hidden"
              >
                {/* Hover glow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.2 }}
                  className="absolute inset-0 bg-gradient-to-br from-razer-green to-razer-cyan blur-xl"
                />
                
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${service.color} p-3 mb-4 relative z-10`}>
                  <Icon className="w-full h-full text-white" />
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2 relative z-10">
                  {service.title}
                </h3>
                
                <p className="text-sm text-gray-400 relative z-10">
                  {service.desc}
                </p>

                {/* Animated corner */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-razer-green to-razer-cyan opacity-20"
                  style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link href="/service">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-razer-green text-black font-bold rounded inline-flex items-center gap-2 relative overflow-hidden"
            >
              <span className="relative z-10">REZERVO TANI</span>
              <Clock className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            *Servis 24/7 për klientët premium
          </p>
        </motion.div>
      </div>
    </section>
  );
}