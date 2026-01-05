import React from 'react';
import { ReactDOM } from 'react';
import header from '@/components/ui/header';
import Footer from '@/components/ui/Footer';

export default function Newsletter() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">S'inscrire à la Newsletter</h1>
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl">
          <p className="text-lg text-gray-600 mb-8">
            Restez informé de nos activités, événements et actualités. 
            Inscrivez-vous à notre newsletter pour ne rien manquer !
          </p>
          
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Votre nom"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="votre@email.com"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              S'inscrire
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
