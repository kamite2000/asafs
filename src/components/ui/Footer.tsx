import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Mail, Phone, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white pt-12 pb-6 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-white p-1 rounded-lg shrink-0">
                <img
                  src="/asft.png"
                  className="w-8 h-8 object-contain"
                  alt="Logo ASAFS"
                />
              </div>
              <div className="text-left leading-tight">
                <p className="text-[8px] font-black text-blue-500 tracking-widest uppercase">Action Solidaire</p>
                <p className="text-[10px] font-bold text-white uppercase tracking-tighter">ASAFS RDC</p>
              </div>
            </Link>
            <p className="text-slate-500 text-[11px] leading-relaxed max-w-xs font-medium">
              Autonomisation des femmes sourdes en RDC par l'éducation et la formation.
            </p>
            <div className="flex gap-2">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[11px] font-black mb-4 flex items-center gap-2 uppercase tracking-widest text-slate-400">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" shrink-0 />
              Navigation
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'À propos', path: '/about' },
                { name: 'Programmes', path: '/programmes' },
                { name: 'Événements', path: '/evenement' },
                { name: 'Contact', path: '/contact' }
              ].map((link) => (
                <Link key={link.path} to={link.path} className="text-slate-600 hover:text-white hover:translate-x-1 transition-all duration-300 text-[11px] font-black uppercase tracking-widest">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Support Section */}
          <div>
            <h4 className="text-[11px] font-black mb-4 flex items-center gap-2 uppercase tracking-widest text-slate-400">
              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" shrink-0 />
              Soutenir
            </h4>
            <div className="space-y-3">
              <Link
                to="/don"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#F4D227] text-slate-950 text-[10px] font-black rounded-lg hover:bg-[#ffe045] transition-all uppercase tracking-widest"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                DONNER
              </Link>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <h5 className="text-[9px] font-black mb-2 uppercase tracking-widest italic text-blue-500/80">Newsletter</h5>
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
                    if (!email) return;
                    
                    try {
                      const btn = e.currentTarget.querySelector('button');
                      if (btn) btn.disabled = true;
                      
                      const { default: api } = await import('@/services/api');
                      const { toast } = await import('sonner');
                      
                      await api.post('/newsletter/subscribe', { email });
                      toast.success("Inscription réussie !");
                      e.currentTarget.reset();
                    } catch (error) {
                      const { toast } = await import('sonner');
                      toast.error("Erreur lors de l'inscription");
                    } finally {
                      const btn = e.currentTarget.querySelector('button');
                      if (btn) btn.disabled = false;
                    }
                  }} 
                  className="flex flex-col gap-1.5"
                >
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Email"
                    className="w-full px-2 py-1.5 bg-white/5 border border-white/10 rounded-md text-[12px] focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                  <button type="submit" className="w-full py-1.5 bg-blue-600/80 text-white text-[9px] font-black uppercase tracking-widest rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50">
                    S'abonner
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[11px] font-black mb-4 flex items-center gap-2 uppercase tracking-widest text-slate-400">
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" shrink-0 />
              Contact
            </h4>
            <div className="space-y-2">
              <div className="flex gap-2 p-2.5 bg-white/5 rounded-lg border border-white/5">
                <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <p className="text-slate-600 text-[11px] leading-tight font-medium">
                  Bukavu, Sud-Kivu, RDC
                </p>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-white/5 rounded-lg border border-white/5">
                <Mail className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <a href="mailto:info@asafs.org" className="text-slate-600 text-[11px] font-medium hover:text-white transition-colors truncate">info@asafs.org</a>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-white/5 rounded-lg border border-white/5">
                <Phone className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <a href="tel:+243000000000" className="text-slate-600 text-[11px] font-medium hover:text-white transition-colors">+243 (0) ...</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
          <p className="text-slate-700 text-[9px] font-black uppercase tracking-widest">
            © {new Date().getFullYear()} ASAFS.
          </p>
          <div className="flex items-center gap-1 text-[9px] text-slate-700 font-bold uppercase tracking-widest">
            Propulsé par 
            <a href="https://aumsoft.net" className="text-slate-600 hover:text-blue-500 transition-colors">
              Aumsoft.net
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;