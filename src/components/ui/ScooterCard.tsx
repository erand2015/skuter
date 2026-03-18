'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Gauge, Battery, ShoppingCart, Heart } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ScooterCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  speed: string;
  range: string;
  power: string;
  isNew?: boolean;
  isLimited?: boolean;
}

export default function ScooterCard({ 
  id, 
  name, 
  price, 
  image, 
  speed,
  range,
  power,
  isNew,
  isLimited 
}: ScooterCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-gradient-to-b from-razer-dark to-razer-black rounded-xl overflow-hidden border border-razer-green/20 hover:border-razer-green transition-all duration-300"
    >
      {/* Background glow effect */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.3 : 0,
          scale: isHovered ? 1.2 : 1,
        }}
        className="absolute inset-0 bg-razer-green blur-3xl"
      />

      {/* Badges */}
      <div className="absolute top-4 left-4 z-20 flex gap-2">
        {isNew && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="px-3 py-1 bg-razer-green text-black text-xs font-bold rounded"
          >
            NEW
          </motion.span>
        )}
        {isLimited && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="px-3 py-1 bg-razer-cyan text-black text-xs font-bold rounded"
          >
            LIMITED
          </motion.span>
        )}
      </div>

      {/* Wishlist Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsInWishlist(!isInWishlist)}
        className={cn(
          "absolute top-4 right-4 z-20 p-2 rounded-full backdrop-blur-sm transition-all",
          isInWishlist 
            ? "bg-razer-green text-black" 
            : "bg-black/50 text-gray-300 border border-razer-green/30 hover:text-razer-green"
        )}
      >
        <Heart className={cn("w-4 h-4", isInWishlist && "fill-current")} />
      </motion.button>

      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-full"
        >
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </motion.div>
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-razer-black via-transparent to-transparent" />
        
        {/* Specs overlay on hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-razer-black to-transparent"
        >
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <Gauge className="w-4 h-4 text-razer-green mx-auto mb-1" />
              <span className="text-xs text-white">{speed}</span>
            </div>
            <div>
              <Battery className="w-4 h-4 text-razer-green mx-auto mb-1" />
              <span className="text-xs text-white">{range}</span>
            </div>
            <div>
              <Zap className="w-4 h-4 text-razer-green mx-auto mb-1" />
              <span className="text-xs text-white">{power}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5 relative z-10">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-razer-green transition-colors">
          {name}
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-white">
              ${price.toLocaleString()}
            </span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-razer-green text-black rounded-full hover:bg-razer-green/90 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Animated border on hover */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-razer-green to-razer-cyan origin-left"
      />
    </motion.div>
  );
}