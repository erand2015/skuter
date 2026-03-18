'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Zap, Shield, Cpu } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Efektet e grimcave
  const [particles, setParticles] = useState<Array<{x: number, y: number, size: number}>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-razer-black">
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(rgba(68, 214, 44, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(68, 214, 44, 0.1) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }} />
        
        {/* Animated particles */}
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute bg-razer-green rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              opacity: 0.3,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
        
        {/* Gradient orbs */}
        <motion.div
          style={{ y }}
          className="absolute top-20 left-10 w-64 h-64 bg-razer-green/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-razer-cyan/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-razer-dark/80 backdrop-blur-sm border border-razer-green/30 rounded-full px-4 py-2 mb-8"
          >
            <Zap className="w-4 h-4 text-razer-green" />
            <span className="text-sm text-razer-green">SKUTERAT MË TË FUQISHËM</span>
            <div className="w-1 h-1 bg-razer-green rounded-full" />
            <span className="text-sm text-gray-400">2026 EDICIONI</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight"
          >
            <span className="block">ZBULO FUQINË</span>
            <span className="razer-gradient text-7xl md:text-8xl lg:text-9xl">
              E RRUGËS
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto"
          >
            Skuterat elektrikë më të avancuar me teknologji të fundit, dizajn futuristik 
            dhe performancë të jashtëzakonshme. Përjetoni lirinë e lëvizjes.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/scooters">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-razer-green text-black font-bold rounded overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  EKSPLORO MODELET
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </Link>
            
            <Link href="/service">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-transparent border-2 border-razer-green text-razer-green rounded font-bold hover:bg-razer-green/10 transition-all flex items-center gap-2"
              >
                <Cpu className="w-5 h-5" />
                SERVISI YNË
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          >
            {[
              { value: '50+', label: 'MODELET', icon: Zap },
              { value: '100km/h', label: 'SHPEJTËSI MAKS', icon: Zap },
              { value: '24/7', label: 'SERVIS', icon: Shield },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="flex items-center justify-center gap-4 p-6 bg-razer-dark/50 backdrop-blur-sm border border-razer-green/20 rounded-lg"
              >
                <stat.icon className="w-8 h-8 text-razer-green" />
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-razer-green/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ height: ['20%', '80%', '20%'] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 bg-razer-green rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}