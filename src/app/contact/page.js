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
    <main className="min-h-screen theme-bg-primary theme-text-primary selection:bg-amber-500/30 font-sans">
      {/* Background Grid & Ambient Glow */}
      <div
        className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="fixed bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-amber-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
        {/* Navigation */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.4em] uppercase text-white/30 hover:text-amber-500 transition-all mb-16"
        >
          <RiArrowLeftLine className="group-hover:-translate-x-1 transition-transform" />
          System_Home
        </Link>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: FORM INTERFACE (8 Columns) */}
          <section className="lg:col-span-8 w-full bg-[#0D0D0D] border border-white/10 rounded-sm overflow-hidden shadow-2xl">
            {/* Terminal Header */}
            <div className="bg-[#1A1A1A] px-6 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">
                uplink_connection.secure
              </span>
            </div>

            <div className="p-8 md:p-14">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-12"
                  >
                    <LetterSentGraphic />
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-12"
                  >
                    <header>
                      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase italic leading-none mb-4">
                        Field<span className="text-amber-500">.</span>Report
                      </h1>
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
                        Initiate direct packet transmission to Sufian
                      </p>
                    </header>

                    <form onSubmit={onSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Name Input */}
                        <div className="space-y-3">
                          <label className="font-mono text-[9px] uppercase tracking-widest text-amber-500/60">
                            01. Source_Identity
                          </label>
                          <input
                            required
                            type="text"
                            name="name"
                            value={form.name ?? ""}
                            onChange={onChange}
                            placeholder="NAME / ALIAS"
                            className="w-full bg-transparent border-b border-white/10 focus:border-amber-500 outline-none text-lg py-2 font-light transition-colors placeholder:text-white/10"
                          />
                        </div>
                        {/* Email Input */}
                        <div className="space-y-3">
                          <label className="font-mono text-[9px] uppercase tracking-widest text-amber-500/60">
                            02. Return_Path
                          </label>
                          <input
                            required
                            type="email"
                            name="email"
                            value={form.email ?? ""}
                            onChange={onChange}
                            placeholder="EMAIL_ADDRESS"
                            className="w-full bg-transparent border-b border-white/10 focus:border-amber-500 outline-none text-lg py-2 font-light transition-colors placeholder:text-white/10"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="font-mono text-[9px] uppercase tracking-widest text-amber-500/60">
                          03. Transmission_Header
                        </label>
                        <input
                          required
                          type="text"
                          name="subject"
                          value={form.subject ?? ""}
                          onChange={onChange}
                          placeholder="SUBJECT_LINE"
                          className="w-full bg-transparent border-b border-white/10 focus:border-amber-500 outline-none text-lg py-2 font-light transition-colors placeholder:text-white/10"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="font-mono text-[9px] uppercase tracking-widest text-amber-500/60">
                          04. Payload_Data
                        </label>
                        <textarea
                          required
                          name="message"
                          value={form.message ?? ""}
                          onChange={onChange}
                          placeholder="ENTER MESSAGE BODY..."
                          className="w-full bg-[#111] border border-white/5 rounded-sm focus:border-amber-500/50 outline-none text-base p-6 min-h-[200px] font-mono transition-all placeholder:text-white/5"
                        />
                      </div>

                      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-white/5">
                        <div className="font-mono text-[9px] text-white/20 uppercase tracking-widest">
                          [ STATUS: READY_TO_SEND ]
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`group relative overflow-hidden bg-white text-black px-12 py-4 rounded-sm font-mono text-[10px] font-bold uppercase tracking-[0.3em] transition-all ${
                            isSubmitting ? "opacity-50" : "hover:bg-amber-500"
                          }`}
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            {isSubmitting
                              ? "Transmitting..."
                              : "Execute_Dispatch"}
                          </span>
                        </button>
                      </div>

                      {error && (
                        <div className="font-mono text-[10px] text-red-500 uppercase tracking-widest p-4 border border-red-500/20 bg-red-500/5">
                          ! Critical_Failure: {error}
                        </div>
                      )}
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* RIGHT: SYSTEM SPECS (4 Columns) */}
          <aside className="lg:col-span-4 w-full space-y-6">
            {/* Live Copy Monitor */}
            <div className="bg-[#0D0D0D] border border-white/10 p-6 rounded-sm space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[9px] uppercase tracking-widest text-amber-500">
                  Live_Monitor
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              </div>
              <div className="bg-black/50 border border-white/5 p-4 rounded-sm">
                <p className="font-mono text-[10px] text-white/30 leading-relaxed break-all uppercase">
                  {form.message
                    ? `> ${form.message.substring(0, 200)}${form.message.length > 200 ? "..." : ""}`
                    : "> Awaiting input sequence..."}
                </p>
              </div>
              <div className="flex justify-between font-mono text-[8px] text-white/20">
                <span>TS: {today}</span>
                <span>LOC: PK_NODE_01</span>
              </div>
            </div>

            {/* Profile Card */}
            <div className="bg-white text-black p-8 rounded-sm group relative overflow-hidden">
              <div className="relative z-10">
                <p className="font-mono text-[9px] uppercase tracking-widest opacity-60 mb-8">
                  Lead_Alchemist
                </p>
                <h3 className="text-3xl font-bold uppercase tracking-tighter mb-1">
                  M. Sufian
                </h3>
                <p className="text-[10px] font-mono uppercase tracking-widest opacity-60 mb-8">
                  Software Engineer
                </p>

                <div className="flex gap-4">
                  <a
                    href="#"
                    className="p-2 border border-black/10 hover:bg-black hover:text-white transition-colors"
                  >
                    <RiTerminalBoxLine size={18} />
                  </a>
                  <a
                    href="#"
                    className="p-2 border border-black/10 hover:bg-black hover:text-white transition-colors"
                  >
                    <RiDatabase2Line size={18} />
                  </a>
                  <a
                    href="#"
                    className="p-2 border border-black/10 hover:bg-black hover:text-white transition-colors"
                  >
                    <RiLinkM size={18} />
                  </a>
                </div>
              </div>
              <div className="absolute bottom-[-20%] right-[-10%] text-black/[0.03] scale-150 rotate-12 group-hover:text-amber-500/10 transition-colors">
                <RiMailSendLine size={200} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
