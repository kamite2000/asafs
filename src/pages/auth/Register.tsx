import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/Footer';

const Register = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Register attempt:', formData);
        navigate('/auth/login');
    };

    return (
        <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
            <Header />
            <div className="flex items-center justify-center py-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800">
                    <div className="text-center">
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{t('register.title')}</h2>
                        <p className="mt-4 text-xs font-black text-slate-400 uppercase tracking-widest italic">
                            {t('register.or')}{' '}
                            <Link to="/auth/login" className="text-blue-600 hover:text-blue-500 underline decoration-2 underline-offset-4">
                                {t('register.login_link')}
                            </Link>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                                    {t('register.name_label')}
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-medium transition-all"
                                    placeholder={t('register.name_label')}
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="email-address" className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                                    {t('register.email_label')}
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-medium transition-all"
                                    placeholder={t('register.email_label')}
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                                    {t('register.password_label')}
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-medium transition-all"
                                    placeholder={t('register.password_label')}
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                                    {t('register.confirm_password_label')}
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-medium transition-all"
                                    placeholder={t('register.confirm_password_label')}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-black uppercase tracking-widest rounded-2xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-lg hover:shadow-blue-600/20 active:scale-[0.98]"
                            >
                                {t('register.submit')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Register;
