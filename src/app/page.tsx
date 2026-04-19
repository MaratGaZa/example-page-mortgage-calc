"use client";

import React from "react";
import { motion } from "framer-motion";
import MortgageCalculator from "@/components/MortgageCalculator";
import {
  ShieldCheck,
  Zap,
  Globe,
  ArrowRight,
  TrendingUp,
  Layers,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-violet-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:rotate-12 transition-transform">
              <TrendingUp className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Fin<span className="text-violet-500">Vault</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {["Calculator", "Rates", "Services", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-slate-400 hover:text-violet-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <button className="btn-primary py-2 px-5 text-sm">Get Started</button>
        </div>
      </nav>

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8">
          {/* Background Decor */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-indigo-600/20 rounded-full blur-[120px]" />
          </div>

          <div className="max-w-7xl mx-auto text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                </span>
                Next Generation Finance
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                Smart Financing for <br />
                <span className="text-gradient">Your Bright Future</span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
                Navigate the complexities of mortgages and loans with our
                advanced intelligent tools. Precision planning for your next big
                investment.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="btn-primary w-full sm:w-auto px-8 py-4 text-lg group">
                  Start Calculating
                  <ArrowRight
                    className="inline-block ml-2 group-hover:translate-x-1 transition-transform"
                    size={20}
                  />
                </button>
                <button className="glass-card px-8 py-4 text-lg font-semibold hover:bg-white/5 transition-colors">
                  View Rates
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="text-violet-400" />,
                title: "Instant Analysis",
                description:
                  "Get real-time mortgage computations with our lightning fast engine.",
              },
              {
                icon: <ShieldCheck className="text-indigo-400" />,
                title: "Secure Planning",
                description:
                  "Your financial data is processed locally and securely within your browser.",
              },
              {
                icon: <Layers className="text-purple-400" />,
                title: "Deep Insights",
                description:
                  "Understand every detail of interest rates, principal, and term impact.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 rounded-3xl border-white/5 hover:border-violet-500/30 transition-all group"
              >
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate.400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Calculator Section */}
        <section
          id="calculator"
          className="py-24 bg-gradient-to-b from-transparent to-violet-950/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Mortgage Calculator
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Adjust the sliders and values below to see your estimated monthly
              payments instantly.
            </p>
          </div>
          <MortgageCalculator />
        </section>

        {/* Trust Section */}
        <section className="py-24 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
              <div className="text-xl font-bold text-white">
                TRUSTED BY GLOBAL INSTITUTIONS
              </div>
              <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                {["FINCORE", "VELOCITY", "AURORA", "ZENITH"].map((brand) => (
                  <span
                    key={brand}
                    className="text-2xl font-black tracking-tighter text-slate-500"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-[#010409]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <TrendingUp size={18} className="text-white" />
            </div>
            <span className="font-bold text-white">FinVault</span>
          </div>

          <div className="flex gap-8 text-sm text-slate-500 font-medium">
            <a href="#" className="hover:text-violet-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-violet-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-violet-400 transition-colors">
              Contact Us
            </a>
          </div>

          <p className="text-sm text-slate-600">
            &copy; {new Date().getFullYear()} FinVault Technologies. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
