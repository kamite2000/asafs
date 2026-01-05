import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/Footer';

const Login = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login logic
        console.log('Login attempt:', { email, password });
        // For now, redirect all logins to admin dashboard as requested
        navigate('/admin/dashboard');
    };

    return (
        <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
            <Header />
            <div className="flex items-center justify-center py-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800">
                    <div className="text-center">
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{t('login.title')}</h2>
                        <p className="mt-4 text-xs font-black text-slate-400 uppercase tracking-widest italic">
                            {t('login.or')}{' '}
                            <Link to="/auth/register" className="text-blue-600 hover:text-blue-500 underline decoration-2 underline-offset-4">
                                {t('login.register_link')}
                            </Link>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email-address" className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                                    {t('login.email_label')}
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-medium transition-all"
                                    placeholder={t('login.email_label')}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                                    {t('login.password_label')}
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-medium transition-all"
                                    placeholder={t('login.password_label')}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-800"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-xs font-bold text-slate-600 dark:text-slate-400">
                                    {t('login.remember_me')}
                                </label>
                            </div>

                            <div className="text-xs">
                                <Link to="/auth/forgot-password" className="font-bold text-blue-600 hover:text-blue-500">
                                    {t('login.forgot_password')}
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-black uppercase tracking-widest rounded-2xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-lg hover:shadow-blue-600/20 active:scale-[0.98]"
                            >
                                {t('login.submit')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
