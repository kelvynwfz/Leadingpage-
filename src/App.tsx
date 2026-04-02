/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, 
  Smartphone, 
  ShieldCheck, 
  Truck, 
  Zap, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';

// --- Types & Data ---

interface iPhoneModel {
  id: string;
  name: string;
  category: 'economize' | 'equilibrio' | 'maximo';
  description: string;
  image: string;
  priceFrom?: string;
  idealFor: string;
  benefits: string[];
  gallery: string[];
}

const IPHONE_MODELS: iPhoneModel[] = [
  { 
    id: '11', 
    name: 'iPhone 11', 
    category: 'economize', 
    description: 'O melhor custo-benefício para quem quer entrar no mundo Apple.',
    image: 'https://i.pinimg.com/1200x/3c/02/c1/3c02c120bf46df0b226361902538233b.jpg',
    priceFrom: '1.999',
    idealFor: 'Estudantes e usuários que buscam o básico com qualidade Apple.',
    benefits: ['Câmera Dupla de 12MP', 'Bateria para o dia todo', 'Chip A13 Bionic'],
    gallery: [
      'https://i.pinimg.com/1200x/3c/02/c1/3c02c120bf46df0b226361902538233b.jpg',
      'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&q=80&w=400'
    ]
  },
  { 
    id: '12', 
    name: 'iPhone 12', 
    category: 'economize', 
    description: 'Design moderno com tela OLED e tecnologia 5G.',
    image: 'https://i.pinimg.com/736x/8f/49/e0/8f49e0b777e8769f765a66972b44b4ee.jpg',
    priceFrom: '2.499',
    idealFor: 'Quem busca design atual e velocidade 5G sem gastar muito.',
    benefits: ['Tela Super Retina XDR', 'MagSafe', 'Modo Noite em todas as câmeras'],
    gallery: [
      'https://i.pinimg.com/736x/8f/49/e0/8f49e0b777e8769f765a66972b44b4ee.jpg',
      'https://images.unsplash.com/photo-1611186871348-b1ec696e52c9?auto=format&fit=crop&q=80&w=400'
    ]
  },
  { 
    id: '13', 
    name: 'iPhone 13', 
    category: 'equilibrio', 
    description: 'Potência e bateria que duram o dia todo com design moderno.',
    image: 'https://i.pinimg.com/736x/76/5f/f1/765ff169758d563fe0d5ee82b559bef5.jpg',
    priceFrom: '3.299',
    idealFor: 'Usuários intensos que precisam de bateria e câmeras avançadas.',
    benefits: ['Modo Cinema', 'Estilos Fotográficos', 'Bateria Gigante'],
    gallery: [
      'https://i.pinimg.com/736x/76/5f/f1/765ff169758d563fe0d5ee82b559bef5.jpg',
      'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80&w=400'
    ]
  },
  { 
    id: '14', 
    name: 'iPhone 14', 
    category: 'equilibrio', 
    description: 'Segurança e performance refinada para o seu dia a dia.',
    image: 'https://i.pinimg.com/1200x/e0/60/7f/e0607f37744bb96c85bfbfe0eedfce42.jpg',
    priceFrom: '3.999',
    idealFor: 'Quem quer as tecnologias mais recentes de segurança e estabilidade.',
    benefits: ['Detecção de Acidente', 'Câmera Frontal com Autofoco', 'Action Mode'],
    gallery: [
      'https://i.pinimg.com/1200x/e0/60/7f/e0607f37744bb96c85bfbfe0eedfce42.jpg',
      'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?auto=format&fit=crop&q=80&w=400'
    ]
  },
  { 
    id: '15', 
    name: 'iPhone 15', 
    category: 'maximo', 
    description: 'A revolução do USB-C e a Dynamic Island em suas mãos.',
    image: 'https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/iphone_15_hero.png',
    priceFrom: '4.899',
    idealFor: 'Entusiastas de tecnologia que buscam a nova conexão padrão e design inovador.',
    benefits: ['Dynamic Island', 'Câmera de 48MP', 'Conector USB-C'],
    gallery: [
      'https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/iphone_15_hero.png',
      'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=400'
    ]
  },
  { 
    id: '16', 
    name: 'iPhone 16', 
    category: 'maximo', 
    description: 'O futuro da inteligência e performance em um design icônico.',
    image: 'https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/121030-iphone-16-plus.png',
    priceFrom: '6.499',
    idealFor: 'Quem não aceita nada menos que o topo de linha absoluto.',
    benefits: ['Apple Intelligence', 'Camera Control', 'Chip A18'],
    gallery: [
      'https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/121030-iphone-16-plus.png',
      'https://images.unsplash.com/photo-1727116194334-31952288091d?auto=format&fit=crop&q=80&w=400'
    ]
  }
];

const TESTIMONIALS = [
  { name: 'Ricardo Silva', text: 'Atendimento muito rápido e super prático. Recomendo!', rating: 5 },
  { name: 'Ana Costa', text: 'Consegui tirar todas as dúvidas no WhatsApp antes de comprar.', rating: 5 },
  { name: 'Marcos Oliveira', text: 'Achei meu iPhone de forma muito mais fácil que em outras lojas.', rating: 5 },
];

const FAQS = [
  { q: 'Quais modelos de iPhone vocês têm disponíveis?', a: 'Trabalhamos com modelos do iPhone 11 ao iPhone 16 Pro Max. Consulte a disponibilidade em tempo real no nosso WhatsApp.' },
  { q: 'Como funciona o atendimento?', a: 'Nosso atendimento é 100% humanizado via WhatsApp. Você escolhe o modelo, tira suas dúvidas e finaliza a compra com segurança.' },
  { q: 'Posso tirar dúvidas antes de comprar?', a: 'Com certeza! Nosso foco é ajudar você a escolher o iPhone ideal para o seu perfil e necessidade.' },
  { q: 'Como faço para pedir pelo WhatsApp?', a: 'Basta clicar em qualquer botão verde da página. Você será redirecionado diretamente para o nosso chat.' },
];

// --- Components ---

const WhatsAppButton = ({ className = '', text = 'Chamar no WhatsApp', secondary = false }) => (
  <motion.a
    href="https://wa.me/5582991068093"
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 ${
      secondary 
        ? 'bg-transparent border-2 border-premium-blue text-premium-ice hover:bg-premium-blue/10' 
        : 'bg-whatsapp text-white hover:bg-whatsapp-hover whatsapp-shadow'
    } ${className}`}
  >
    <MessageCircle size={24} />
    {text}
  </motion.a>
);

const ModelPage = ({ model, onBack }: { model: iPhoneModel, onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen pt-24 pb-20"
    >
      <div className="container mx-auto px-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-premium-gray hover:text-white mb-8 transition-colors"
        >
          <ArrowRight size={20} className="rotate-180" />
          Voltar para Início
        </button>

        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">{model.name}</h1>
            <p className="text-xl text-premium-gray mb-8">{model.description}</p>
            <WhatsAppButton text="Consultar Disponibilidade" className="w-full md:w-auto" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-premium-blue/20 blur-[100px] rounded-full" />
            <img 
              src={model.image} 
              alt={model.name} 
              className="relative z-10 w-full rounded-3xl shadow-2xl border border-white/10 animate-float"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        {/* Ideal For Block */}
        <div className="glass-card p-8 md:p-12 mb-24 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Para quem esse iPhone é ideal?</h2>
          <p className="text-lg text-premium-gray max-w-2xl mx-auto">{model.idealFor}</p>
          <div className="mt-8 flex justify-center">
            <div className="px-6 py-2 rounded-full bg-premium-blue/10 text-premium-blue font-bold">
              Escolha Inteligente
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {model.benefits.map((benefit, i) => (
            <div key={i} className="glass-card p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-premium-blue/10 flex items-center justify-center text-premium-blue mx-auto mb-6">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">{benefit}</h3>
              <p className="text-sm text-premium-gray">Tecnologia de ponta para sua melhor experiência.</p>
            </div>
          ))}
        </div>

        {/* Gallery */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-12 text-center">Galeria Visual</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {model.gallery.map((img, i) => (
              <div key={i} className="rounded-3xl overflow-hidden border border-white/10 aspect-video">
                <img 
                  src={img} 
                  alt={`${model.name} view ${i}`} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Intermediate CTA */}
        <div className="text-center mb-24">
          <WhatsAppButton text={`Quero esse ${model.name} no WhatsApp`} className="w-full md:w-auto px-12" />
        </div>

        {/* Trust Block */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {[
            { icon: Zap, text: 'Atendimento Rápido' },
            { icon: ShieldCheck, text: 'Processo Simples' },
            { icon: MessageCircle, text: 'Suporte Direto' },
            { icon: Smartphone, text: 'Consulta Fácil' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-3 p-6 glass-card">
              <item.icon size={24} className="text-premium-blue" />
              <span className="text-sm font-bold">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Mini FAQ */}
        <div className="max-w-2xl mx-auto mb-24">
          <h2 className="text-2xl font-bold mb-8 text-center">Dúvidas Rápidas</h2>
          <div className="space-y-4">
            {[
              { q: `Tem disponibilidade do ${model.name}?`, a: 'Consulte as cores e capacidades disponíveis agora mesmo no nosso WhatsApp.' },
              { q: 'Posso tirar dúvidas antes de comprar?', a: 'Com certeza! Nosso time está pronto para te ajudar a fazer a melhor escolha.' },
            ].map((item, i) => (
              <div key={i} className="glass-card p-6">
                <h4 className="font-bold mb-2">{item.q}</h4>
                <p className="text-sm text-premium-gray">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="glass-card p-12 md:p-20 text-center border-premium-blue/30">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Gostou desse modelo?</h2>
          <p className="text-lg text-premium-gray mb-10">Fale agora no WhatsApp e veja disponibilidade, condições e mais informações sobre o {model.name}.</p>
          <WhatsAppButton text="Chamar no WhatsApp Agora" className="w-full md:w-auto px-12 py-6 text-xl" />
        </div>
      </div>
    </motion.div>
  );
};

const SectionTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="text-center mb-12 px-4">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold mb-4 tracking-tight"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-premium-gray max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);

  const selectedModel = IPHONE_MODELS.find(m => m.id === selectedModelId);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (selectedModel) {
    return (
      <div className="min-h-screen font-sans selection:bg-premium-blue selection:text-white">
        <ModelPage model={selectedModel} onBack={() => setSelectedModelId(null)} />
        
        {/* Sticky Bottom Bar (Mobile) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-premium-black/80 backdrop-blur-lg border-t border-white/10 p-4">
          <WhatsAppButton text="Pedir no WhatsApp" className="w-full py-3 text-base" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans selection:bg-premium-blue selection:text-white">
      
      {/* --- Navigation --- */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-premium-black/80 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSelectedModelId(null)}>
            <div className="w-8 h-8 bg-premium-blue rounded-lg flex items-center justify-center">
              <Smartphone size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tighter">iStore<span className="text-premium-blue">Premium</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#modelos" className="text-premium-gray hover:text-white transition-colors">Modelos</a>
            <a href="#beneficios" className="text-premium-gray hover:text-white transition-colors">Benefícios</a>
            <a href="#faq" className="text-premium-gray hover:text-white transition-colors">Dúvidas</a>
            <WhatsAppButton text="Falar Agora" className="px-6 py-2 text-sm" />
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-premium-dark-blue border-b border-white/10 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                <a href="#modelos" onClick={() => setIsMenuOpen(false)} className="text-lg py-2 border-b border-white/5">Modelos</a>
                <a href="#beneficios" onClick={() => setIsMenuOpen(false)} className="text-lg py-2 border-b border-white/5">Benefícios</a>
                <a href="#faq" onClick={() => setIsMenuOpen(false)} className="text-lg py-2 border-b border-white/5">Dúvidas</a>
                <WhatsAppButton className="w-full mt-4" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-premium-blue/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-premium-neon-blue/10 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-premium-blue text-sm font-medium mb-6"
            >
              <Zap size={14} />
              <span>Atendimento Prioritário via WhatsApp</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl font-bold mb-6 tracking-tight leading-[1.1]"
            >
              Seu Próximo iPhone <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-premium-blue to-premium-neon-blue">Está Aqui</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-premium-gray mb-10 max-w-2xl"
            >
              Modelos do iPhone 11 ao 16, com atendimento rápido, suporte direto e um jeito simples de encontrar o iPhone certo para você.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <WhatsAppButton className="w-full sm:w-auto" />
              <motion.a 
                href="#modelos"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg border-2 border-white/10 hover:bg-white/5 transition-all"
              >
                Ver Modelos
                <ArrowRight size={20} />
              </motion.a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="mt-16 relative"
            >
              <div className="absolute inset-0 bg-premium-blue/20 blur-[100px] rounded-full" />
              <img 
                src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=800" 
                alt="iPhones Premium" 
                className="relative z-10 w-full max-w-2xl mx-auto rounded-3xl shadow-2xl border border-white/10 animate-float"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Trust Bar --- */}
      <section className="py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Smartphone, text: 'Modelos Variados' },
              { icon: Truck, text: 'Entrega Segura' },
              { icon: ShieldCheck, text: 'Garantia Premium' },
              { icon: Zap, text: 'Resposta Rápida' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-premium-blue/10 flex items-center justify-center text-premium-blue">
                  <item.icon size={24} />
                </div>
                <span className="font-medium text-sm md:text-base">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Which iPhone Matches You? --- */}
      <section id="modelos" className="py-24 bg-premium-dark-blue/30">
        <div className="container mx-auto px-6">
          <SectionTitle 
            title="Qual iPhone combina com você?" 
            subtitle="Simplificamos sua escolha. Encontre o modelo ideal para o seu perfil e necessidade."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Para quem quer economizar', 
                models: ['iPhone 11', 'iPhone 12'], 
                icon: '💰',
                desc: 'A porta de entrada perfeita para o ecossistema Apple.',
                targetId: '11'
              },
              { 
                title: 'Para quem quer equilíbrio', 
                models: ['iPhone 13', 'iPhone 14'], 
                icon: '⚖️',
                desc: 'O balanço ideal entre performance, câmera e bateria.',
                targetId: '13'
              },
              { 
                title: 'Para quem quer o máximo', 
                models: ['iPhone 15', 'iPhone 16'], 
                icon: '🚀',
                desc: 'O que há de mais avançado em tecnologia e fotografia.',
                targetId: '16'
              },
            ].map((card, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 flex flex-col h-full hover:border-premium-blue/50 transition-all duration-500 group"
              >
                <div className="text-4xl mb-6">{card.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
                <p className="text-premium-gray mb-6 flex-grow">{card.desc}</p>
                <div className="space-y-3 mb-8">
                  {card.models.map((m, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-premium-ice/80">
                      <CheckCircle2 size={16} className="text-premium-blue" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setSelectedModelId(card.targetId)}
                  className="w-full py-3 text-base font-bold rounded-full bg-premium-blue/10 text-premium-blue hover:bg-premium-blue hover:text-white transition-all"
                >
                  Ver Detalhes
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Featured Models --- */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <SectionTitle 
            title="Modelos em Destaque" 
            subtitle="Uma seleção estratégica dos iPhones mais desejados do momento."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {IPHONE_MODELS.map((model, i) => (
              <motion.div 
                key={model.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card overflow-hidden group cursor-pointer"
                onClick={() => setSelectedModelId(model.id)}
              >
                <div className="aspect-square overflow-hidden relative">
                  <img 
                    src={model.image} 
                    alt={model.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-premium-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-sm text-premium-ice/90">{model.description}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{model.name}</h3>
                  <p className="text-premium-blue font-medium text-sm mb-4">A partir de R$ {model.priceFrom}</p>
                  <button className="w-full py-2.5 text-sm font-bold rounded-full border border-premium-blue text-premium-blue group-hover:bg-premium-blue group-hover:text-white transition-all">
                    Ver Detalhes do {model.name}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- How it Works --- */}
      <section className="py-24 bg-premium-dark-blue/20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto glass-card p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-premium-blue/10 blur-[80px] rounded-full -mr-32 -mt-32" />
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Como comprar seu iPhone</h2>
                <p className="text-premium-gray mb-8">Processo simples, rápido e direto. Sem burocracia, do jeito que você merece.</p>
                
                <div className="space-y-8">
                  {[
                    { step: '01', title: 'Escolha o modelo', desc: 'Navegue pela nossa vitrine e escolha o iPhone que mais combina com você.' },
                    { step: '02', title: 'Chame no WhatsApp', desc: 'Clique em um dos botões para iniciar uma conversa direta com nosso time.' },
                    { step: '03', title: 'Tire suas dúvidas', desc: 'Veja fotos reais, consulte a disponibilidade e formas de pagamento.' },
                    { step: '04', title: 'Finalize seu pedido', desc: 'Receba seu iPhone com toda segurança e garantia iStorePremium.' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="text-premium-blue font-bold text-xl opacity-50">{item.step}</div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                        <p className="text-premium-gray text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1556656793-062ff9878258?auto=format&fit=crop&q=80&w=600" 
                  alt="Atendimento WhatsApp" 
                  className="rounded-2xl shadow-2xl border border-white/10"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-6 -right-6 bg-whatsapp p-4 rounded-2xl shadow-xl animate-bounce">
                  <MessageCircle size={32} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Benefits --- */}
      <section id="beneficios" className="py-24">
        <div className="container mx-auto px-6">
          <SectionTitle title="Por que escolher a iStorePremium?" />
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'Atendimento Rápido', desc: 'Resposta direta no WhatsApp para facilitar sua compra sem esperas.' },
              { icon: Smartphone, title: 'Modelos para Todos', desc: 'Do iPhone 11 ao 16 Pro Max, temos a opção certa para o seu bolso.' },
              { icon: ShieldCheck, title: 'Compra Segura', desc: 'Processo transparente, seguro e com garantia em todos os aparelhos.' },
            ].map((benefit, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 rounded-2xl bg-white/[0.03] border border-white/5 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-premium-blue/10 flex items-center justify-center text-premium-blue mx-auto mb-6">
                  <benefit.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-premium-gray">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Testimonials --- */}
      <section className="py-24 bg-premium-dark-blue/30">
        <div className="container mx-auto px-6">
          <SectionTitle title="O que dizem nossos clientes" />
          
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} size={16} className="fill-premium-blue text-premium-blue" />
                  ))}
                </div>
                <p className="italic text-premium-ice/90 mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-premium-blue/20 flex items-center justify-center font-bold text-premium-blue">
                    {t.name.charAt(0)}
                  </div>
                  <span className="font-bold">{t.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section id="faq" className="py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <SectionTitle title="Dúvidas Frequentes" />
          
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="glass-card overflow-hidden">
                <button 
                  className="w-full p-6 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                >
                  <span className="font-bold">{faq.q}</span>
                  {activeFaq === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-premium-gray"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Final CTA --- */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-premium-blue/10 blur-[150px] rounded-full -z-10" />
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto glass-card p-12 md:p-20 border-premium-blue/30"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Pronto para Encontrar Seu Próximo iPhone?</h2>
            <p className="text-lg md:text-xl text-premium-gray mb-10">
              Fale agora no WhatsApp e veja os modelos disponíveis, tire dúvidas e encontre a melhor opção para você.
            </p>
            <WhatsAppButton className="w-full md:w-auto text-xl px-12 py-6" text="Chamar no WhatsApp Agora" />
            <p className="mt-6 text-sm text-premium-gray flex items-center justify-center gap-2">
              <ShieldCheck size={16} />
              Atendimento 100% seguro e humanizado
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-12 border-t border-white/5 bg-premium-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-premium-blue rounded-lg flex items-center justify-center">
                <Smartphone size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold tracking-tighter">iStore<span className="text-premium-blue">Premium</span></span>
            </div>
            
            <div className="flex gap-8 text-sm text-premium-gray">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Facebook</a>
              <a href="#" className="hover:text-white transition-colors">WhatsApp</a>
            </div>

            <p className="text-sm text-premium-gray">
              © 2024 iStorePremium. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* --- Sticky Bottom Bar (Mobile) --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-premium-black/80 backdrop-blur-lg border-t border-white/10 p-4">
        <WhatsAppButton text="Pedir no WhatsApp" className="w-full py-3 text-base" />
      </div>

    </div>
  );
}
