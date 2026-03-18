'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, Shield, Cpu } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  
  // Përdor useState për të gjeneruar grimcat VETËM në klient
  const [particles, setParticles] = useState<Array<{x: number, y: number, size: number, delay: number}>>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Gjenero grimcat VETËM në klient
    const newParticles = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-razer-black">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid overlay - kjo nuk ka random, s'mban problem */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `linear-gradient(rgba(68, 214, 44, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(68, 214, 44, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
        
        {/* Animated particles - shfaqi VETËM kur është montuar në klient */}
        {mounted && particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute bg-razer-green rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Gradient orbs */}
        <motion.div
          style={{ y }}
          className="absolute top-20 left-10 w-96 h-96 bg-razer-green/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-razer-cyan/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-razer-dark/80 backdrop-blur-sm border border-razer-green/30 rounded-full px-4 py-2 mb-8"
            >
              <Zap className="w-4 h-4 text-razer-green" />
              <span className="text-sm text-razer-green">2026 FLAGSHIP</span>
              <div className="w-1 h-1 bg-razer-green rounded-full" />
              <span className="text-sm text-gray-400">EDICIONI I KUFIZUAR</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
            >
              <span className="block">RAZER</span>
              <span className="razer-gradient text-6xl md:text-7xl lg:text-8xl">
                STORM PRO
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-gray-400 mb-8 max-w-lg"
            >
              Skuteri elektrik më i avancuar në botë. 0-100 km/h në 3.5 sekonda, 
              autonomi 120 km dhe dizajn futuristik i frymëzuar nga gaming.
            </motion.p>

            {/* Specs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-4 mb-8 max-w-md"
            >
              {[
                { label: 'SHPEJTËSI', value: '120 km/h' },
                { label: 'AUTONOMI', value: '120 km' },
                { label: 'FUQIA', value: '6000W' },
              ].map((spec, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl font-bold text-white">{spec.value}</div>
                  <div className="text-xs text-gray-500">{spec.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/scooters/razer-storm-pro">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-razer-green text-black font-bold rounded overflow-hidden min-w-[200px]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    POROSIT TANI
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
              
              <Link href="#features">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border-2 border-razer-green text-razer-green rounded font-bold hover:bg-razer-green/10 transition-all"
                >
                  SPECIFIKIMET
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - The Scooter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative h-[600px] lg:h-[700px] flex items-center justify-center"
          >
            {/* Skuteri që vjen nga errësira */}
            <motion.div
              initial={{ 
                opacity: 0,
                scale: 0.3,
                x: 200,
                rotateY: 90,
                filter: "blur(20px)"
              }}
              animate={{ 
                opacity: 1,
                scale: 1,
                x: 0,
                rotateY: 0,
                filter: "blur(0px)"
              }}
              transition={{ 
                duration: 1.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.3
              }}
              className="relative w-full h-full"
            >
              {/* Efekti i dritës pas skuterit */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-razer-green/30 rounded-full blur-3xl"
              />
              
              {/* IMAZHI I SKUTERIT */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-full h-full z-10"
              >
                <Image
                  src="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&auto=format&fit=crop"
                  alt="Razer Storm Pro Scooter"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </motion.div>

              {/* Grimcat rreth skuterit - gjithashtu të kushtëzuara */}
              {mounted && [...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-razer-green rounded-full"
                  style={{
                    left: `${50 + Math.sin(i) * 30}%`,
                    top: `${50 + Math.cos(i) * 30}%`,
                  }}
                  animate={{
                    scale: [0, 2, 0],
                    opacity: [0, 1, 0],
                    x: [0, (Math.random() - 0.5) * 100],
                    y: [0, (Math.random() - 0.5) * 100],
                  }}
                  transition={{
                    duration: 2 + Math.random(),
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>

            {/* Linjat neon rreth skuterit */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <motion.circle
                cx="50%"
                cy="50%"
                r="200"
                fill="none"
                stroke="url(#neonGradient)"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0, rotate: 0 }}
                animate={{ pathLength: 1, opacity: 1, rotate: 360 }}
                transition={{ duration: 2, delay: 1, repeat: Infinity, ease: "linear" }}
              />
              <defs>
                <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#44d62c" />
                  <stop offset="50%" stopColor="#00ffff" />
                  <stop offset="100%" stopColor="#44d62c" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-500 tracking-wider">LËVIZ POSHTË</span>
          <div className="w-6 h-10 border-2 border-razer-green/50 rounded-full flex justify-center">
            <motion.div
              animate={{ height: ['20%', '80%', '20%'] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 bg-razer-green rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}