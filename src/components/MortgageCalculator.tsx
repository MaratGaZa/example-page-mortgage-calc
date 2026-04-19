"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  Info,
  TrendingUp,
  DollarSign,
  Percent,
  Calendar,
  ArrowRight
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility for tailwind class merging
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MortgageResult {
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  monthlyInterest: number;
}

const MortgageCalculator: React.FC = () => {
  // State for inputs
  const [loanAmount, setLoanAmount] = useState<number>(300000);
  const [interestRate, setInterestRate] = useState<number>(5.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [downPayment, setDownPayment] = useState<number>(60000);

  // State for results
  const [results, setResults] =
    useState<MortgageResult>({
      monthlyPayment: 0,
      totalInterest: 0,
      totalPayment: 0,
      monthlyInterest: 0,
    });

  // Calculate mortgage logic
  useEffect(() => {
    const principal = loanAmount - downPayment;
    if (principal <= 0) {
      setResults({
        monthlyPayment: 0,
        totalInterest: 0,
        totalPayment: 0,
        monthlyInterest: 0,
      });
      return;
    }

    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    // Formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
    const x = Math.pow(1 + monthlyRate, numberOfPayments);
    const monthly = (principal * x * monthlyRate) / (x - 1);
    const totalPayable = monthly * numberOfPayments;
    const totalInt = totalPayable - principal;

    setResults({
      monthlyPayment: monthly,
      totalInterest: totalInt,
      totalPayment: totalPayable,
      monthlyInterest: totalInt / numberOfPayments,
    });
  }, [loanAmount, interestRate, loanTerm, downPayment]);

  // Formatters
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  const formatPercent = (value: number) =>
    `${value.toFixed(2)}%`;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-grid-cols-12 gap-8 items-start"
      >
        {/* Input Section */}
        <div className="lg:col-span-7 glass-card p-8 rounded-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-violet-500/20 rounded-2xl text-violet-400">
              <Calculator size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Mortgage Parameters</h2>
              <p className="text-slate-400 text-sm">Configure your loan details</p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Loan Amount Slider/Input */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <DollarSign size={16} className="text-violet-400" />
                  Property Value
                </label>
                <span className="text-xl font-bold text-white">{formatCurrency(loanAmount)}</span>
              </div>
              <input
                type="range"
                min="50000"
                max="2000000"
                step="5000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
              />
            </div>

            {/* Down Payment Slider/Input */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-violet-500" />
                  Down Payment
                </label>
                <span className="text-xl font-bold text-white">{formatCurrency(downPayment)}</span>
              </div>
              <input
                type="range"
                min="0"
                max={loanAmount}
                step="1000"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {/* Interest Rate Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Percent size={16} className="text-violet-400" />
                  Interest Rate
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="input-field pr-12"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">%</span>
                </div>
              </div>

              {/* Loan Term Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate.300 flex items-center gap-2">
                  <Calendar size={16} className="text-violet-400" />
                  Loan Term (Years)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="input-field pr-12"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">yrs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-8 rounded-3xl border-violet-500/30 bg-gradient-to-br from-slate-900/80 to-violet-900/20">
            <h3 className="text-slate/40 text-sm font-medium uppercase tracking-widest mb-6 flex items-center gap-2">
              <TrendingUp size={18} className="text-violet-400" />
              Monthly Repayment
            </h3>

            <div className="flex flex-col items-start sm:items-center">
              <motion.div
                key={results.monthlyPayment}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-5xl md:text-6xl font-black text-white mb-2"
              >
                {formatCurrency(results.monthlyPayment)}
              </motion.div>
              <p className="text-violet-400 font-medium">Estimated monthly cost</p>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 gap-4">
              <div>
                <p className="text-slate-400 text-xs uppercase mb-1">Total Interest</p>
                <p className="text-lg font-bold text-white">{formatCurrency(results.totalInterest)}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs uppercase mb-1">Total Repayment</p>
                <p className="text-lg font-bold text-white">{formatCurrency(results.totalPayment)}</p>
              </div>
            </div>
          </div>

          {/* Additional Info Card */}
          <div className="glass-card p-6 rounded-3xl bg-slate-900/40 border-white/5">
             <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Info size={20} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-white">Loan Overview</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Based on a loan amount of <span className="text-violet-300">{formatCurrency(loanAmount - downPayment)}</span>
                    after your down payment.
                  </p>
                </div>
             </div>
          </div>

          <button className="btn-primary w-full flex items-center justify-center gap-2 group">
            Apply for this loan
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default MortgageCalculator;
