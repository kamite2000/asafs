import React, { useState } from 'react';
import Footer from '@/components/ui/Footer';
import { Heart, ShieldCheck, Globe, Users, CreditCard, ChevronRight } from 'lucide-react';

export default function Donate() {
  const [amount, setAmount] = useState<number | string>(25);
  const [method, setMethod] = useState<'mpesa' | 'orange' | 'airtel' | 'card'>('mpesa');
  const [phone, setPhone] = useState('');

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src="/Rectangle 27.png"
          alt="ASAFS Impact"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-white dark:to-slate-950" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="inline-block px-3 py-1 bg-yellow-400/20 backdrop-blur-md border border-yellow-400/30 rounded-full text-yellow-400 text-[10px] font-black tracking-widest uppercase mb-4">
            Soutien Direct
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase">
            ENSEMBLE, CHANGEONS <br />
            <span className="text-yellow-400 italic">DES VIES</span>
          </h1>
          <p className="text-sm md:text-base text-gray-200 font-medium max-w-xl mx-auto leading-relaxed">
            Votre don finance l'éducation et l'autonomisation des femmes sourdes en RDC.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          
          {/* Donation Selection */}
          <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-slate-100 dark:border-slate-800 transition-all">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Contribuez</h2>
                <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest italic">Impact Solidaire</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Amount Selection */}
              <div className="grid grid-cols-3 gap-3">
                {[10, 25, 50, 100, 250, 500].map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val)}
                    className={`py-3 px-2 rounded-xl font-black text-base transition-all duration-300 border-2 ${
                      amount === val 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105' 
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-50 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-200'
                    }`}
                  >
                    {val}$
                  </button>
                ))}
              </div>

              <div className="relative group">
                <input
                  type="number"
                  value={amount}
                  placeholder="Montant personnalisé"
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-50 dark:border-slate-800 rounded-2xl text-lg font-bold text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition-all placeholder:text-slate-300"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xl font-black text-slate-300 group-focus-within:text-blue-600">$</span>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mode de Paiement</p>
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'mpesa', name: 'M-Pesa', logo: '/logos/mpesa.png' },
                      { id: 'orange', name: 'Orange', logo: '/logos/orange.png' },
                      { id: 'airtel', name: 'Airtel', logo: '/logos/airtel.png' },
                      { id: 'card', name: 'Carte', logo: 'https://cdn-icons-png.flaticon.com/512/179/179457.png' }
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setMethod(p.id as any)}
                        className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all relative overflow-hidden ${
                          method === p.id 
                          ? 'bg-blue-600/5 border-blue-600 shadow-sm' 
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-50 dark:border-slate-800 hover:border-blue-200'
                        }`}
                      >
                        <img src={p.logo} alt={p.name} className="h-8 w-auto object-contain mb-1 rounded-sm grayscale group-hover:grayscale-0" />
                        <span className={`text-[9px] font-black uppercase tracking-tighter ${method === p.id ? 'text-blue-600' : 'text-slate-400'}`}>
                          {p.name}
                        </span>
                        {method === p.id && <div className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full" />}
                      </button>
                    ))}
                 </div>
              </div>

              {/* Phone Number Field (Only for Mobile Money) */}
              {method !== 'card' && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2">Numéro de Téléphone</p>
                  <input
                    type="tel"
                    placeholder="081 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-50 dark:border-slate-800 rounded-2xl text-lg font-bold text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition-all placeholder:text-slate-300"
                  />
                </div>
              )}

              <div className="space-y-4 pt-4">
                <button className="w-full flex items-center justify-between px-6 py-5 bg-slate-950 dark:bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-slate-800 dark:hover:bg-blue-700 transition-all group">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5" />
                    PROCÉDER AU DON
                  </div>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-center text-slate-400 text-[10px] font-black uppercase tracking-widest italic">
                   Sécurité garantie via cryptage SSL 256 bits
                </p>
              </div>
            </div>
          </div>

          {/* Impact Info */}
          <div className="space-y-8 lg:pt-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Pourquoi nous soutenir ?</h3>
              <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium">
                Votre générosité est le moteur de notre changement. En donnant à l'ASAFS, vous participez directement à :
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: ShieldCheck, title: "Transparence", desc: "100% des dons vont au terrain", color: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400" },
                { icon: Globe, title: "Portée Locale", desc: "Impact direct au Sud-Kivu", color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" },
                { icon: Users, title: "Communauté", desc: "Soutien aux familles", color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400" },
                { icon: Heart, title: "Dignité", desc: "Restauration des droits", color: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400" }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-4`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">{item.title}</h4>
                  <p className="text-slate-400 dark:text-slate-500 text-xs font-medium">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-8 bg-blue-600 rounded-[3rem] text-white relative overflow-hidden shadow-2xl shadow-blue-900/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full" />
              <div className="relative z-10">
                <p className="text-blue-100 font-bold text-sm uppercase mb-4 tracking-widest">Le Saviez-vous ?</p>
                <p className="text-2xl font-black leading-tight">
                  "Un don de 50$ permet de financer 1 mois de formation professionnelle pour une femme sourde."
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
