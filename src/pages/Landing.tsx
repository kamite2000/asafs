import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '@/components/ui/Footer';

const Landing = () => {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden bg-gray-900 text-white">
                <div className="absolute inset-0 bg-[url('/path/to/hero-bg.jpg')] bg-cover bg-center opacity-30"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        Bienvenue sur <span className="text-blue-500">ASAFS Platform</span>
                    </h1>
                    <p className="max-w-2xl text-lg md:text-xl text-gray-300 mb-10">
                        La plateforme dédiée à l'autonomisation et à l'inclusion des femmes sourdes.
                        Découvrez nos outils, nos formations et notre communauté.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/auth/register" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition-transform transform hover:scale-105">
                            Commencer
                        </Link>
                        <Link to="/auth/login" className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 rounded-full font-semibold transition-transform transform hover:scale-105">
                            Se Connecter
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features / Overview Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Pourquoi nous rejoindre ?</h2>
                        <p className="mt-4 text-gray-600">Un aperçu de ce que notre plateforme vous offre.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Feature 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Formations Adaptées</h3>
                            <p className="text-gray-600">
                                Accédez à des cours et des ressources pédagogiques conçus spécifiquement pour la langue des signes.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Communauté Active</h3>
                            <p className="text-gray-600">
                                Échangez, partagez et grandissez avec une communauté de femmes dynamiques et solidaires.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Suivi Personnalisé</h3>
                            <p className="text-gray-600">
                                Bénéficiez d'un tableau de bord pour suivre vos progrès et vos participations aux événements.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-blue-600 text-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Prête à commencer l'aventure ?</h2>
                    <p className="text-xl mb-10 opacity-90">
                        Rejoignez-nous dès aujourd'hui et faites partie du changement.
                    </p>
                    <Link to="/auth/register" className="inline-block px-10 py-4 bg-white text-blue-600 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-colors">
                        Créer un compte
                    </Link>
                </div>
            </section>

            {/* Footer removed as per requirement */}
        </div>
    );
};

export default Landing;
