"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { 
  MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, 
  ChevronRight, Star, Utensils, ChefHat, Leaf, Award,
  Calendar, Users, MessageSquare, ArrowRight
} from "lucide-react";

// Custom hook for smooth scroll with Lenis
function useSmoothScroll() {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    const initLenis = async () => {
      const Lenis = (await import("lenis")).default;
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenisRef.current = lenis;

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  return lenisRef;
}

// Animated section wrapper
function AnimatedSection({ 
  children, 
  className = "", 
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Parallax image component
function ParallaxImage({ 
  src, 
  alt, 
  className = "",
  speed = 0.5
}: { 
  src: string; 
  alt: string; 
  className?: string;
  speed?: number;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="w-full h-full object-cover scale-110"
      />
    </div>
  );
}

// Navigation Component
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Philosophy", href: "#philosophy" },
    { label: "Showcase", href: "#showcase" },
    { label: "Menu", href: "#menu" },
    { label: "Reserve", href: "#reservation" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-charcoal/90 backdrop-blur-xl border-b border-white/5" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
              <span className="font-display text-xl text-white">H</span>
            </div>
            <span className="font-display text-2xl tracking-wider text-cream">HIKARI</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-sm text-gray-light hover:text-cream transition-colors duration-300 tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a href="#reservation" className="btn-premium">
              <span>Reserve Table</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-cream"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-cream transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-full h-0.5 bg-cream transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`w-full h-0.5 bg-cream transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-charcoal/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-6 py-8 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-body text-lg text-gray-light hover:text-cream transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a href="#reservation" className="btn-premium inline-block mt-4">
                <span>Reserve Table</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// Hero Section
function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-charcoal noise-overlay"
    >
      {/* Background Video/Image Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent z-10" />
        <img 
          src="/images/5_2_791_Sushi_Platter_Stock_Video_Footage.png" 
          alt="Premium sushi platter"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Floating Ingredients */}
      <motion.div 
        style={{ y }}
        className="absolute top-20 right-[15%] w-16 h-16 opacity-20"
      >
        <img src="/images/5_Japanese_Condiment_for_Sushi_Soy.png" alt="" className="w-full h-full object-contain" />
      </motion.div>

      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -150]) }}
        className="absolute bottom-40 right-[25%] w-12 h-12 opacity-15"
      >
        <img src="/images/3_Soy_sauce_dark_liquid_pouring_into.png" alt="" className="w-full h-full object-contain" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-serif italic text-accent text-lg tracking-wide">
                Est. 2019 — Tokyo Inspired
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-cream"
            >
              HIKARI<br />
              <span className="text-gradient">MODERN</span><br />
              RESTAURANT
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-body text-gray-light text-lg max-w-md leading-relaxed"
            >
              Where centuries of Japanese culinary tradition meet contemporary artistry. 
              Each piece tells a story of precision, passion, and the pursuit of perfection.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-4"
            >
              <a href="#reservation" className="btn-premium">
                <span className="flex items-center gap-2">
                  Book a Table
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
              <a href="#menu" className="btn-outline">
                Explore Menu
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-8 pt-8 border-t border-white/10"
            >
              <div>
                <span className="font-display text-3xl text-cream">12</span>
                <p className="font-body text-sm text-gray-light mt-1">Seat Counter</p>
              </div>
              <div>
                <span className="font-display text-3xl text-cream">18</span>
                <p className="font-body text-sm text-gray-light mt-1">Course Omakase</p>
              </div>
              <div>
                <span className="font-display text-3xl text-cream">5</span>
                <p className="font-body text-sm text-gray-light mt-1">Michelin Stars</p>
              </div>
            </motion.div>
          </div>

          {/* Right - Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <img 
                src="/images/3_Assorted_sushi_platter_on_dark_background.png" 
                alt="Premium sushi platter"
                className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl shadow-black/50"
              />
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 border border-accent/30 rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/20 rounded-full blur-xl" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Cards Strip */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 z-30 translate-y-1/2"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { img: "/images/1_2_791_Sushi_Platter_Stock_Video_Footage.png", label: "Signature Nigiri" },
              { img: "/images/8_Japanese_sushi_platter_on_dark_stone.png", label: "Salmon Rolls" },
              { img: "/images/1_Sushi_Chef_Hands_Making_Nigiri_Close.png", label: "Chef's Craft" },
              { img: "/images/9_Gourmet_sushi_platter_on_elegant.png", label: "Premium Ingredients" },
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="bg-charcoal-light rounded-xl overflow-hidden shadow-xl shadow-black/30 border border-white/5 hover-lift"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={card.img} 
                    alt={card.label}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-4">
                  <p className="font-oswald text-sm text-cream tracking-wide">{card.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// Philosophy Section
function PhilosophySection() {
  const features = [
    {
      icon: Leaf,
      title: "Fresh Ingredients",
      description: "Sourced daily from Toyosu Market, our fish travels from ocean to plate within 24 hours. Every ingredient is hand-selected by our master buyers.",
      image: "/images/5_Japanese_Condiment_for_Sushi_Soy.png"
    },
    {
      icon: ChefHat,
      title: "Master Chefs",
      description: "Our head chef trained for 15 years in Tokyo's most prestigious kitchens. Each piece of sushi is crafted with decades of refined technique.",
      image: "/images/7_Chef_s_hand_holding_fresh_piece_of.png"
    },
    {
      icon: Utensils,
      title: "Authentic Recipes",
      description: "Recipes passed down through generations, honoring Edomae tradition while embracing subtle modern innovations that elevate without compromising.",
      image: "/images/4_Pouring_Sweet_Soy_Sauce_Into_White.png"
    },
    {
      icon: Award,
      title: "Premium Experience",
      description: "An intimate 12-seat counter where every guest receives personalized attention. The journey from appetizer to dessert is choreographed like theater.",
      image: "/images/10_black_ink_walls_dimmed_lighting_engulf.png"
    }
  ];

  return (
    <section id="philosophy" className="relative py-32 bg-cream overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-charcoal rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-20">
          <span className="font-serif italic text-accent text-lg">Our Philosophy</span>
          <h2 className="font-display text-5xl md:text-6xl text-charcoal mt-4 tracking-tight">
            CRAFTED WITH<br />
            <span className="text-accent">INTENTION</span>
          </h2>
          <p className="font-body text-gray-text text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
            At HIKARI, we believe that exceptional dining is not just about taste—it's about 
            the entire sensory journey. From the moment you enter, every detail is designed 
            to transport you to the heart of Japanese culinary artistry.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg shadow-charcoal/5 hover:shadow-xl hover:shadow-charcoal/10 transition-shadow duration-500"
              >
                <div className="grid md:grid-cols-2">
                  <div className="p-8 flex flex-col justify-center">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                      <feature.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-oswald text-2xl text-charcoal tracking-wide mb-3">
                      {feature.title}
                    </h3>
                    <p className="font-body text-gray-text text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <div className="relative overflow-hidden">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// Showcase Section
function ShowcaseSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section 
      id="showcase" 
      ref={containerRef}
      className="relative py-32 bg-charcoal overflow-hidden noise-overlay"
    >
      {/* Decorative floating elements */}
      <motion.div 
        style={{ y: imageY }}
        className="absolute top-20 right-10 w-32 h-32 opacity-10"
      >
        <img src="/images/6_Closeup_of_nigiri_sushi_with_seared.png" alt="" className="w-full h-full object-contain" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text Content */}
          <AnimatedSection>
            <div className="space-y-8">
              <span className="font-serif italic text-accent text-lg">The Art of Sushi</span>
              <h2 className="font-display text-5xl md:text-6xl text-cream leading-[0.95] tracking-tight">
                WHERE EVERY<br />
                <span className="text-gradient">PIECE TELLS</span><br />
                A STORY
              </h2>
              <div className="space-y-6">
                <p className="font-body text-gray-light text-lg leading-relaxed">
                  Our omakase experience is a journey through the seasons. Each course is 
                  designed to build upon the last, creating a crescendo of flavors that 
                  celebrates the natural beauty of Japan's finest ingredients.
                </p>
                <p className="font-body text-gray-light leading-relaxed">
                  Watch as our master chef transforms the simplest ingredients into edible 
                  art. The rhythm of the knife, the precision of the rice, the delicate 
                  placement of each garnish—every movement is a meditation on perfection.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                {["Edomae Style", "Seasonal Menu", "Aged Fish", "House-made Soy"].map((tag, i) => (
                  <span 
                    key={i}
                    className="px-4 py-2 rounded-full border border-white/10 text-sm font-body text-gray-light hover:border-accent hover:text-accent transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a href="#menu" className="btn-premium inline-flex items-center gap-2 mt-4">
                <span>View Our Menu</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </AnimatedSection>

          {/* Right - Large Image */}
          <AnimatedSection delay={0.2}>
            <div className="relative">
              <motion.div
                style={{ y: imageY }}
                className="relative z-10"
              >
                <img 
                  src="/images/6_Sushi_unagi_tempura_rolls_california.png" 
                  alt="Signature sushi showcase"
                  className="w-full rounded-2xl shadow-2xl shadow-black/50"
                />
                {/* Overlay badge */}
                <div className="absolute bottom-6 left-6 glass-dark rounded-xl px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-accent fill-accent" />
                    <div>
                      <p className="font-oswald text-cream text-sm">Michelin Starred</p>
                      <p className="font-body text-gray-light text-xs">Since 2021</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Background decorative image */}
              <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-2xl overflow-hidden opacity-60 z-0">
                <img 
                  src="/images/2_Sushi_roll_with_shrimp_tempura_cucumber.png" 
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Accent circle */}
              <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-accent/20 rounded-full" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// Menu Section
function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("sushi");

  const categories = [
    { id: "sushi", label: "Sushi" },
    { id: "sashimi", label: "Sashimi" },
    { id: "rolls", label: "Signature Rolls" },
    { id: "specials", label: "Chef Specials" },
    { id: "desserts", label: "Desserts" },
  ];

  const menuItems: Record<string, Array<{name: string, description: string, price: string, image: string, tag?: string}>> = {
    sushi: [
      { name: "Otoro Nigiri", description: "Fatty bluefin tuna belly, aged 14 days", price: "$45", image: "/images/1_2_791_Sushi_Platter_Stock_Video_Footage.png", tag: "Chef's Pick" },
      { name: "Salmon Aburi", description: "Flame-seared Norwegian salmon, truffle oil", price: "$28", image: "/images/6_Closeup_of_nigiri_sushi_with_seared.png" },
      { name: "Amaebi", description: "Sweet shrimp, served with fried head", price: "$32", image: "/images/2_36_569_Nigiri_Salmon_Black_Background.png" },
      { name: "Uni", description: "Hokkaido sea urchin, fresh wasabi", price: "$52", image: "/images/5_2_791_Sushi_Platter_Stock_Video_Footage.png", tag: "Seasonal" },
    ],
    sashimi: [
      { name: "Maguro Trio", description: "Akami, chutoro, otoro comparison", price: "$85", image: "/images/1_2_791_Sushi_Platter_Stock_Video_Footage.png" },
      { name: "Hamachi", description: "Japanese yellowtail, yuzu kosho", price: "$38", image: "/images/2_36_569_Nigiri_Salmon_Black_Background.png" },
      { name: "Hotate", description: "Hokkaido scallop, finger lime", price: "$42", image: "/images/6_Closeup_of_nigiri_sushi_with_seared.png" },
    ],
    rolls: [
      { name: "Dragon Roll", description: "Shrimp tempura, avocado, unagi sauce", price: "$35", image: "/images/8_Japanese_sushi_platter_on_dark_stone.png" },
      { name: "Rainbow Roll", description: "California roll topped with 5 fish varieties", price: "$38", image: "/images/9_Gourmet_sushi_platter_on_elegant.png" },
      { name: "Spicy Tuna", description: "Chopped tuna, chili oil, crispy shallots", price: "$28", image: "/images/3_Assorted_sushi_platter_on_dark_background.png" },
    ],
    specials: [
      { name: "Omakase Course", description: "18 courses, chef's selection", price: "$280", image: "/images/5_2_791_Sushi_Platter_Stock_Video_Footage.png", tag: "Signature" },
      { name: "Kaiseki Dinner", description: "Traditional multi-course Japanese dinner", price: "$320", image: "/images/10_black_ink_walls_dimmed_lighting_engulf.png" },
    ],
    desserts: [
      { name: "Matcha Tiramisu", description: "Layered matcha mascarpone, azuki beans", price: "$18", image: "/images/3_Soy_sauce_dark_liquid_pouring_into.png" },
      { name: "Yuzu Sorbet", description: "Fresh yuzu, shiso leaf", price: "$14", image: "/images/4_Pouring_Sweet_Soy_Sauce_Into_White.png" },
    ],
  };

  return (
    <section id="menu" className="relative py-32 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="font-serif italic text-accent text-lg">Culinary Excellence</span>
          <h2 className="font-display text-5xl md:text-6xl text-charcoal mt-4 tracking-tight">
            OUR MENU
          </h2>
          <p className="font-body text-gray-text text-lg max-w-2xl mx-auto mt-6">
            Each dish is a testament to our commitment to quality, tradition, and innovation.
          </p>
        </AnimatedSection>

        {/* Category Navigation */}
        <AnimatedSection delay={0.1} className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-full font-oswald text-sm tracking-wide transition-all duration-500 ${
                  activeCategory === cat.id
                    ? "bg-charcoal text-cream shadow-lg"
                    : "bg-white text-charcoal border border-charcoal/10 hover:border-accent hover:text-accent"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Menu Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid md:grid-cols-2 gap-6"
          >
            {menuItems[activeCategory]?.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="group menu-item-hover bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
              >
                <div className="flex">
                  <div className="w-32 h-32 flex-shrink-0 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-oswald text-xl text-charcoal tracking-wide">
                          {item.name}
                        </h3>
                        <span className="font-display text-xl text-accent">{item.price}</span>
                      </div>
                      <p className="font-body text-gray-text text-sm">{item.description}</p>
                    </div>
                    {item.tag && (
                      <span className="inline-block mt-3 px-3 py-1 bg-accent/10 text-accent text-xs font-oswald rounded-full w-fit">
                        {item.tag}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// Reservation Section
function ReservationSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "2",
    date: "",
    time: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your reservation request! We will contact you shortly to confirm.");
  };

  return (
    <section id="reservation" className="relative py-32 bg-charcoal overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img 
          src="/images/10_black_ink_walls_dimmed_lighting_engulf.png" 
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <AnimatedSection>
            <div className="relative">
              <img 
                src="/images/4_Sushi_Restaurant_Behance.png" 
                alt="Restaurant interior"
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 glass-dark rounded-xl p-6 max-w-xs">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-accent" />
                  <span className="font-oswald text-cream">Opening Hours</span>
                </div>
                <div className="space-y-2 font-body text-sm text-gray-light">
                  <div className="flex justify-between">
                    <span>Tue - Thu</span>
                    <span>6:00 PM - 11:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fri - Sat</span>
                    <span>5:30 PM - 12:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>5:00 PM - 10:00 PM</span>
                  </div>
                  <p className="text-accent text-xs mt-2">Closed Mondays</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right - Form */}
          <AnimatedSection delay={0.2}>
            <div className="glass rounded-2xl p-8 lg:p-10">
              <span className="font-serif italic text-accent text-lg">Reservations</span>
              <h2 className="font-display text-4xl md:text-5xl text-cream mt-2 mb-2 tracking-tight">
                BOOK YOUR<br />EXPERIENCE
              </h2>
              <p className="font-body text-gray-light mb-8">
                Secure your seat at our intimate 12-person counter. 
                Reservations recommended 2 weeks in advance.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-body text-sm text-gray-light mb-2">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-body text-sm text-gray-light mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-body text-sm text-gray-light mb-2">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-body text-sm text-gray-light mb-2">Number of Guests</label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({...formData, guests: e.target.value})}
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-body text-sm text-gray-light mb-2">Preferred Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-body text-sm text-gray-light mb-2">Preferred Time</label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      required
                    >
                      <option value="">Select time</option>
                      <option value="17:30">5:30 PM</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="18:30">6:30 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="19:30">7:30 PM</option>
                      <option value="20:00">8:00 PM</option>
                      <option value="20:30">8:30 PM</option>
                      <option value="21:00">9:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-body text-sm text-gray-light mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-1" />
                    Additional Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Dietary restrictions, special occasions, seating preferences..."
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  />
                </div>

                <button type="submit" className="btn-premium w-full">
                  <span className="flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Request Reservation
                  </span>
                </button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="relative bg-charcoal-dark pt-20 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <span className="font-display text-xl text-white">H</span>
              </div>
              <span className="font-display text-2xl tracking-wider text-cream">HIKARI</span>
            </div>
            <p className="font-body text-gray-light text-sm leading-relaxed mb-6">
              An intimate omakase experience where Japanese tradition meets contemporary artistry.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a 
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent/20 transition-colors duration-300"
                >
                  <Icon className="w-5 h-5 text-gray-light" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-oswald text-cream tracking-wide mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "Our Story", "Menu", "Reservations", "Private Events"].map((link) => (
                <li key={link}>
                  <a href="#" className="font-body text-sm text-gray-light hover:text-accent transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-oswald text-cream tracking-wide mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="font-body text-sm text-gray-light">
                  123 Sakura Lane<br />Tokyo District, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="font-body text-sm text-gray-light">+1 (212) 555-0189</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="font-body text-sm text-gray-light">reservations@hikari.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-oswald text-cream tracking-wide mb-6">Stay Updated</h4>
            <p className="font-body text-sm text-gray-light mb-4">
              Subscribe for seasonal menu updates and exclusive events.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 text-sm"
              />
              <button className="btn-premium px-4">
                <span className="text-sm">Join</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="section-divider mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-gray-light">
            © 2026 HIKARI Restaurant. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Accessibility"].map((link) => (
              <a key={link} href="#" className="font-body text-xs text-gray-light hover:text-cream transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Page Component
export default function Home() {
  useSmoothScroll();

  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <div className="h-48 bg-charcoal" /> {/* Spacer for floating cards */}
      <PhilosophySection />
      <ShowcaseSection />
      <MenuSection />
      <ReservationSection />
      <Footer />
    </main>
  );
}
