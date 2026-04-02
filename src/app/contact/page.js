"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  RiGitRepositoryLine,
  RiArrowLeftLine,
  RiTerminalBoxLine,
  RiDatabase2Line,
  RiLinkM,
  RiMailSendLine,
} from "react-icons/ri";
import { submitContactForm } from "@/lib/api/contactApi";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function LetterSentGraphic() {
  return (
    <div className="bg-[#1A1A1A] border border-amber-500/20 p-12 text-center max-w-xl mx-auto rounded-3xl shadow-[0_0_30px_rgba(245,158,11,0.05)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-amber-500/5 to-transparent opacity-50 pointer-events-none" />
      
      <div className="w-24 h-24 mx-auto mb-8 bg-amber-500/10 rounded-full flex items-center justify-center border border-amber-500/20">
        <RiMailSendLine size={40} className="text-amber-500" />
      </div>
      
      <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-[#DAD5D0] mb-4">
        Transmission Sent
      </h2>
      
      <p className="text-[#DAD5D0]/60 font-mono tracking-widest uppercase text-xs">
        Signal #001 locked. Awaiting system response.
      </p>
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const today = new Date().toISOString().slice(0, 10);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const result = await submitContactForm(form);

    if (result.success) {
      setIsSuccess(true);
      setForm(initialForm);
    } else {
      setError(result.error || "Submission failed.");
    }

    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-[#252423] text-[#DAD5D0] overflow-hidden pt-24 pb-40">
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-[#DAD5D0]/40 hover:text-amber-500 transition-colors mb-20"
          >
            <RiArrowLeftLine /> Back to Engine
          </Link>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* MAIN FORM SECTION */}
            <section id="contact-form" className="flex-1 w-full bg-[#1A1A1A] border border-[#DAD5D0]/10 rounded-3xl p-8 md:p-14 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="py-12"
                  >
                    <LetterSentGraphic />
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 flex flex-col h-full"
                  >
                    <header className="mb-16">
                      <p className="font-mono text-[10px] tracking-[0.5em] uppercase opacity-40 mb-4 text-[#DAD5D0]">
                        System.Channel(Open)
                      </p>
                      <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-[#DAD5D0] leading-none mb-6">
                        Field Report
                      </h1>
                      <p className="text-[#DAD5D0]/60 text-lg">
                        Initiate a direct transmission to the central database.
                      </p>
                    </header>

                    <form onSubmit={onSubmit} className="space-y-10 flex-1 flex flex-col">
                      <div className="relative group">
                        <label className="font-mono text-xs tracking-[0.2em] uppercase text-[#DAD5D0]/40 block mb-3">
                          Subject Name
                        </label>
                        <input
                          required
                          type="text"
                          name="name"
                          value={form.name ?? ""}
                          onChange={onChange}
                          className="w-full bg-transparent border-b border-[#DAD5D0]/20 focus:border-amber-500 outline-none text-xl md:text-2xl py-3 placeholder:opacity-20 transition-colors"
                          placeholder="Who is initiating?"
                        />
                      </div>

                      <div className="relative group">
                        <label className="font-mono text-xs tracking-[0.2em] uppercase text-[#DAD5D0]/40 block mb-3">
                          Return Frequency (Email)
                        </label>
                        <input
                          required
                          type="email"
                          name="email"
                          value={form.email ?? ""}
                          onChange={onChange}
                          className="w-full bg-transparent border-b border-[#DAD5D0]/20 focus:border-amber-500 outline-none text-xl md:text-2xl py-3 placeholder:opacity-20 transition-colors"
                          placeholder="Frequency/Email Address"
                        />
                      </div>

                      <div className="relative group">
                        <label className="font-mono text-xs tracking-[0.2em] uppercase text-[#DAD5D0]/40 block mb-3">
                          Transmission Subject
                        </label>
                        <input
                          required
                          type="text"
                          name="subject"
                          value={form.subject ?? ""}
                          onChange={onChange}
                          className="w-full bg-transparent border-b border-[#DAD5D0]/20 focus:border-amber-500 outline-none text-xl md:text-2xl py-3 placeholder:opacity-20 transition-colors"
                          placeholder="What is this about?"
                        />
                      </div>

                      <div className="relative flex-1">
                        <label className="font-mono text-xs tracking-[0.2em] uppercase text-[#DAD5D0]/40 block mb-4">
                          Transmission Data
                        </label>
                        <textarea
                          required
                          name="message"
                          value={form.message ?? ""}
                          onChange={onChange}
                          className="w-full bg-[#252423] border border-[#DAD5D0]/10 rounded-2xl focus:border-amber-500 outline-none text-lg md:text-xl py-6 px-6 resize-vertical min-h-[250px] placeholder:opacity-20 transition-colors"
                          placeholder="Start typing your payload here..."
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-8">
                        
                        <div className="hidden sm:block">
                          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-amber-500/60">
                            Sufian&apos;s Ledger // 2026.Q4
                          </p>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`bg-amber-500 text-[#252423] py-4 px-10 rounded-full font-mono text-xs font-bold tracking-[0.2em] uppercase transition-all flex items-center gap-3 w-full sm:w-auto justify-center ${
                            isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:scale-105 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:bg-amber-400"
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="w-4 h-4 rounded-full border-2 border-[#252423] border-t-transparent animate-spin" /> 
                              Transmitting...
                            </>
                          ) : (
                            "Send Report"
                          )}
                        </button>
                      </div>

                      {error && (
                        <div className="mt-4 border border-red-500/20 bg-red-500/5 p-4 rounded-xl text-red-400 text-sm font-medium flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                          {error}
                        </div>
                      )}
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            {/* SIDEBAR CARBON COPY */}
            <aside id="contact-sidebar" className="w-full lg:w-96 flex flex-col gap-8">
              <div className="bg-[#1A1A1A] border border-[#DAD5D0]/10 p-8 rounded-3xl relative overflow-hidden shadow-2xl">
                <div className="absolute top-4 right-4 bg-red-500/10 border border-red-500/30 text-red-500 font-mono text-[8px] uppercase tracking-widest px-2 py-1 rounded">
                  Internal Only
                </div>
                
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-amber-500 mb-6">
                  Carbon Copy Area
                </h3>
                
                <div className="space-y-6 text-sm font-mono text-[#DAD5D0]/60">
                  <p className="border-b border-[#DAD5D0]/10 pb-3">CC: ARCHIVE_SYSTEM_V2</p>
                  <p className="border-b border-[#DAD5D0]/10 pb-3">DATE: {today}</p>
                  <div className="min-h-48 bg-[#252423] border border-[#DAD5D0]/5 rounded-xl p-6 text-[#DAD5D0]/40 leading-loose break-words shadow-inner">
                    {form.message
                      ? `[ SYSTEM LOG ]\n\n${form.message}\n\n_`
                      : "[ SYSTEM LOG ]\n\nReady to intercept incoming transmission.\nAwaiting manual input from user.\nCarbon copy will be generated upon dispatch.\n\n_"}
                  </div>
                </div>
              </div>

              {/* SYSTEMS ALCHEMIST CARD */}
              <div className="bg-[#1A1A1A] border border-[#DAD5D0]/10 p-8 rounded-3xl flex flex-col items-center text-center relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#DAD5D0]/5 to-transparent opacity-20" />
                
                <div className="w-24 h-24 rounded-full border-4 border-[#252423] overflow-hidden mb-6 relative z-10 flex items-center justify-center bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                  <div className="absolute inset-0 bg-[url('/assets/floating-elements.png')] bg-cover opacity-20 mix-blend-screen" />
                  <span className="text-4xl font-black italic text-amber-500">S</span>
                </div>
                
                <h3 className="font-mono text-xs tracking-widest uppercase text-[#DAD5D0] mb-2 relative z-10">
                  M. Sufian
                </h3>
                <p className="text-sm text-[#DAD5D0]/40 uppercase tracking-widest relative z-10">
                  Lead Systems Alchemist
                </p>
                
                <div className="mt-8 flex gap-6 relative z-10">
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="text-[#DAD5D0]/40 hover:text-amber-500 transition-colors">
                    <RiTerminalBoxLine size={20} />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-[#DAD5D0]/40 hover:text-amber-500 transition-colors">
                    <RiDatabase2Line size={20} />
                  </a>
                  <a href="#" className="text-[#DAD5D0]/40 hover:text-amber-500 transition-colors">
                    <RiLinkM size={20} />
                  </a>
                </div>
              </div>
            </aside>

          </div>
        </div>
    </main>
  );
}
