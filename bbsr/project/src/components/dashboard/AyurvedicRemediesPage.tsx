import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Flower2, Sprout } from 'lucide-react';
import GlassCard from '../common/GlassCard';

const ayurvedicBlogs = [
  {
    id: '1',
    title: 'Tulsi for Immunity',
    description: 'Tulsi (Holy Basil) boosts immunity and helps fight infections naturally. Add fresh leaves to your tea or water daily.',
    icon: Leaf,
    link: '#',
  },
  {
    id: '2',
    title: 'Turmeric for Inflammation',
    description: 'Turmeric contains curcumin, a powerful anti-inflammatory compound. Use it in warm milk or curries for best results.',
    icon: Flower2,
    link: '#',
  },
  {
    id: '3',
    title: 'Ashwagandha for Stress',
    description: 'Ashwagandha is known to reduce stress and improve energy. Try it as a supplement or in herbal teas.',
    icon: Sprout,
    link: '#',
  },
  {
    id: '4',
    title: 'Neem for Skin Health',
    description: 'Neem leaves are antibacterial and help treat acne and skin infections. Use neem paste or neem water for clear skin.',
    icon: Leaf,
    link: '#',
  },
  {
    id: '5',
    title: 'Amla for Hair & Digestion',
    description: 'Amla (Indian Gooseberry) is rich in Vitamin C, boosts hair growth, and improves digestion. Eat raw or as juice.',
    icon: Flower2,
    link: '#',
  },
  {
    id: '6',
    title: 'Ginger for Cough & Cold',
    description: 'Ginger soothes sore throat and relieves cold symptoms. Add to tea or chew raw slices with honey.',
    icon: Sprout,
    link: '#',
  },
  {
    id: '7',
    title: 'Giloy for Fever',
    description: 'Giloy (Guduchi) helps reduce fever and boosts immunity. Drink giloy juice or decoction regularly.',
    icon: Leaf,
    link: '#',
  },
  {
    id: '8',
    title: 'Triphala for Digestion',
    description: 'Triphala is a blend of three fruits that aids digestion and detoxifies the body. Take as powder or tablet.',
    icon: Flower2,
    link: '#',
  },
  {
    id: '9',
    title: 'Brahmi for Memory',
    description: 'Brahmi is known to enhance memory and reduce anxiety. Consume as tea or supplement.',
    icon: Sprout,
    link: '#',
  },
  {
    id: '10',
    title: 'Mulethi for Sore Throat',
    description: 'Mulethi (Licorice root) soothes sore throat and cough. Chew a small piece or add to herbal tea.',
    icon: Leaf,
    link: '#',
  },
];

const AyurvedicRemediesPage: React.FC = () => {
  return (
    <div className="p-8 max-w-2xl mx-auto w-full flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-white mb-8 flex items-center gap-3"
      >
        <Leaf className="w-7 h-7 text-green-400" />
        Ayurvedic Remedies
      </motion.h1>
      <GlassCard className="p-8 w-full flex flex-col gap-6 shadow-xl">
        <div className="flex-1 overflow-y-auto max-h-[500px] pr-2 space-y-6 scrollbar-thin scrollbar-thumb-dark-border/40 scrollbar-track-transparent">
          {ayurvedicBlogs.map((blog) => {
            const Icon = blog.icon;
            return (
              <div
                key={blog.id}
                className="flex items-start gap-5 bg-dark-card/60 rounded-xl p-5 border border-dark-border/40 shadow-md shadow-black/10 hover:shadow-green-400/10 transition-all duration-300 group"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-green-400/10">
                  <Icon className="w-8 h-8 text-green-400 drop-shadow-glow" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-green-300 transition-colors">{blog.title}</h3>
                  <p className="text-gray-300 text-sm mb-2 line-clamp-2">{blog.description}</p>
                  <a
                    href={blog.link}
                    className="inline-block text-xs font-medium text-green-400 hover:text-green-300 underline underline-offset-2 transition-colors rounded px-2 py-1 bg-green-400/5 group-hover:bg-green-400/10"
                    tabIndex={0}
                  >
                    Read More
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
};

export default AyurvedicRemediesPage; 