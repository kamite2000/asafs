import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContent, AdminUser } from '@/lib/ContentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";
import api from '@/services/api';

const AdminAuth: React.FC = () => {
    const navigate = useNavigate();
    const { setCurrentUser } = useContent();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await api.post('/auth/login', {
                email: formData.email,
                password: formData.password
            });

            const adminUser: AdminUser = {
                id: data.user.id,
                email: data.user.email,
                name: data.user.name,
                role: data.user.role,
                avatar: data.user.avatar || data.user.name.charAt(0).toUpperCase(),
                token: data.token
            };
            
            // ContentContext handles localStorage synchronization automatically via useEffect
            setCurrentUser(adminUser);
            
            toast.success(`Bienvenue ${data.user.name}!`);
            navigate('/admin/dashboard');
            
            // Wait, ContentContext Effect:
            // useEffect(() => { if (currentUser) localStorage.setItem("asafs_user", JSON.stringify(currentUser)); ... }, [currentUser])
            // So if I set currentUser, it overwrites.
            
            // Solution: I should update AdminUser type in ContentContext properly OR handle auth separately.
            // For MVP: I will just use `asafs_token` separately in API service if I can, OR
            // better: Update AdminUser interface in ContentContext to optional token.
            // Or just hack it by saving token elsewhere.
            
            // Let's Update api.ts to read from `asafs_token` separately? No, I wrote logic to read `asafs_user`.
            // I will proactively update `ContentContext` AdminUser type to include token.
            
            toast.success(`Bienvenue ${data.user.name}!`);
            navigate('/admin/dashboard');
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Erreur de connexion");
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post('/auth/register', {
                email: formData.email,
                password: formData.password,
                name: formData.name,
                role: 'editor' // Default role
            });
            
            toast.success("Compte créé avec succès! Veuillez vous connecter.");
            setIsLogin(true); // Switch to login
        } catch (error: any) {
             toast.error(error.response?.data?.message || "Erreur lors de l'inscription");
        } finally {
            setLoading(false); // Fix: ensure loading is false
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side: Visual/Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 items-center justify-center p-12 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-20">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400 blur-[80px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500 blur-[80px]"></div>
                </div>
                
                <div className="relative z-10 text-white max-w-lg">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-8 shadow-2xl border border-white/20">
                        <span className="text-3xl font-extrabold tracking-tighter italic">AS</span>
                    </div>
                    <h1 className="text-5xl font-bold leading-tight mb-6">
                        Plateforme d'Administration <span className="text-blue-400">ASAFS</span>
                    </h1>
                    <p className="text-xl text-blue-100/80 leading-relaxed mb-8">
                        Gérez le contenu de votre organisation de manière intuitive et efficace. Notre interface simplifiée vous permet de rester concentré sur l'essentiel.
                    </p>
                    <div className="flex items-center gap-6 pt-8 border-t border-white/10">
                        <div className="flex -space-x-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-xs font-bold">
                                    {String.fromCharCode(64 + i)}
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-blue-100/60">Rejoignez l'équipe des administrateurs</p>
                    </div>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white relative">
                <div className="w-full max-w-md space-y-8">
                    <div className="lg:hidden text-center mb-10">
                         <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <span className="text-white text-xl font-bold">AS</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">ASAFS Admin</h2>
                    </div>

                    <div className="text-left">
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            {isLogin ? 'Bon retour parmi nous' : 'Créer un compte'}
                        </h2>
                        <p className="mt-2 text-gray-600">
                            {isLogin 
                                ? 'Entrez vos identifiants pour accéder au tableau de bord.' 
                                : 'Remplissez le formulaire pour rejoindre l\'administration.'}
                        </p>
                    </div>

                    <form onSubmit={isLogin ? handleLogin : handleRegister} className="mt-8 space-y-6">
                        {!isLogin && (
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Nom Complet</label>
                                <Input
                                    type="text"
                                    placeholder="Jean Dupont"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="h-12 border-gray-200 focus:ring-blue-500 rounded-xl"
                                    required={!isLogin}
                                />
                            </div>
                        )}

                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700 ml-1">Adresse Email</label>
                            <Input
                                type="email"
                                placeholder="nom@asafs.org"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="h-12 border-gray-200 focus:ring-blue-500 rounded-xl"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center justify-between mb-1">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Mot de passe</label>
                                {isLogin && (
                                    <button type="button" className="text-xs font-medium text-blue-600 hover:text-blue-500">
                                        Mot de passe oublié ?
                                    </button>
                                )}
                            </div>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="h-12 border-gray-200 focus:ring-blue-500 rounded-xl"
                                required
                            />
                        </div>



                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Traitement...</span>
                                </div>
                            ) : (
                                isLogin ? 'Se Connecter' : 'Créer un Compte'
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 text-center pt-4">
                        <p className="text-sm text-gray-600">
                            {isLogin ? "Nouveau sur la plateforme ?" : "Vous avez déjà un compte ?"}{' '}
                            <button
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setFormData({ email: '', password: '', name: '' });
                                }}
                                className="text-blue-600 hover:text-blue-800 font-bold decoration-2 hover:underline underline-offset-4 transition-all"
                            >
                                {isLogin ? "S'inscrire gratuitement" : "Se connecter ici"}
                            </button>
                        </p>
                    </div>

                    <p className="text-center text-xs text-gray-400 mt-12">
                        &copy; {new Date().getFullYear()} ASAFS. Tous droits réservés.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminAuth;
