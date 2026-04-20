# 🌍 ASAFS - African Sign Language & French Support Platform

> Une plateforme complète pour la promotion de la langue des signes africaine avec support multilingue (Français, Anglais, Swahili)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-22-green?logo=node.js)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5.2-black?logo=express)](https://expressjs.com)
[![SQLite](https://img.shields.io/badge/SQLite-3-003b57?logo=sqlite)](https://www.sqlite.org)
[![Stripe](https://img.shields.io/badge/Stripe-API-blueviolet?logo=stripe)](https://stripe.com)

---

## 📋 Table des Matières

- [Aperçu du Projet](#-aperçu-du-projet)
- [Architecture](#-architecture)
- [Technologie](#-stack-technologique)
- [Structure du Projet](#-structure-du-projet)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Démarrage](#-démarrage)
- [Scripts Disponibles](#-scripts-disponibles)
- [Déploiement](#-déploiement)
- [Contribution](#-contribution)
- [Support](#-support)

---

## 🎯 Aperçu du Projet

**ASAFS** est une application full-stack moderne qui combine:

✅ **Frontend React** - Interface utilisateur réactive et moderne  
✅ **Backend Node.js/Express** - API REST robuste et sécurisée  
✅ **Database SQLite** - Stockage de données léger et performant  
✅ **Authentication JWT** - Authentification sécurisée  
✅ **Paiements** - Intégration Stripe et Maisha Pay  
✅ **Multilingue** - Support FR, EN, Swahili  
✅ **Admin Dashboard** - Gestion complète du contenu  

---

## 🏗️ Architecture

### Vue d'Ensemble Globale

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT (React/Vite)                       │
│  Port 5173 - UI moderne avec TailwindCSS + shadcn/ui        │
│  TanStack Query | React Router | i18next                    │
└────────────────────────┬────────────────────────────────────┘
                         │
                    HTTP/REST API
                         │
┌────────────────────────▼────────────────────────────────────┐
│              SERVER (Express/Node.js)                        │
│  Port 3000 - API REST avec validation Zod + JWT             │
│  Swagger Docs | Error Handling | Middleware                 │
└────────────────────────┬────────────────────────────────────┘
                         │
                   Prisma ORM
                         │
┌────────────────────────▼────────────────────────────────────┐
│            DATABASE (SQLite)                                 │
│  Users | Posts | Newsletter | Contacts | Settings           │
└─────────────────────────────────────────────────────────────┘
```

### Architecture en Couches (Backend)

```
Routes → Controllers → Services → Prisma → SQLite
   ↓           ↓          ↓
Middleware  Business   Database
(Auth/Log) Logic      Queries
```

---

## 🛠️ Stack Technologique

### **Frontend (94% TypeScript)**

| Outil | Version | Usage |
|-------|---------|-------|
| **React** | 18.3.1 | Framework UI |
| **Vite** | 7.3.0 | Build tool ultra-rapide |
| **TypeScript** | 5.5.3 | Typage statique |
| **TailwindCSS** | 3.4.11 | Styling utilitaire |
| **shadcn/ui** | Latest | Composants accessibles |
| **React Router** | 6.29.0 | Routing côté client |
| **TanStack Query** | 5.56.2 | State management & data fetching |
| **React Hook Form** | 7.53.0 | Gestion des formulaires |
| **Zod** | 3.23.8 | Validation de schéma |
| **Axios** | 1.13.2 | HTTP Client |
| **i18next** | 25.7.3 | Internationalisation |
| **next-themes** | 0.3.0 | Dark/Light mode |
| **@react-pdf/renderer** | 4.3.2 | Export PDF |

### **Backend (TypeScript + Node.js)**

| Outil | Version | Usage |
|-------|---------|-------|
| **Express** | 5.2.1 | Framework web |
| **Prisma** | 5.10.0 | ORM & Database management |
| **TypeScript** | 5.5.3 | Typage statique |
| **JWT** | 9.0.3 | Authentification |
| **bcryptjs** | 3.0.3 | Password hashing |
| **Zod** | 3.23.8 | Validation |
| **Nodemailer** | 7.0.12 | Emails |
| **Stripe** | 20.1.0 | Paiements |
| **Multer** | 2.0.2 | File upload |
| **Swagger** | 5.0.1 | API Documentation |
| **Helmet** | 8.1.0 | Security headers |
| **CORS** | 2.8.5 | Cross-Origin requests |
| **Morgan** | 1.10.1 | HTTP logging |

### **Database**

| Type | Technologie | Version |
|------|------------|---------|
| **Database** | SQLite | 3 |
| **ORM** | Prisma | 5.10.0 |
| **Migration** | Prisma Migrate | Built-in |

---

## 📂 Structure du Projet

```
asafs/
├── 📁 src/                          # Frontend React
│   ├── 📁 components/               # Composants réutilisables
│   │   ├── 📁 ui/                  # shadcn/ui components
│   │   ├── 📁 auth/                # Authentication components
│   │   └── 📁 admin/               # Admin components
│   ├── 📁 pages/                    # Pages (lazy loaded)
│   │   ├── Index.tsx               # Accueil
│   │   ├── programmes.tsx          # Programmes
│   │   ├── evenement.tsx           # Événements
│   │   ├── don.tsx                 # Donations (Stripe/Maisha Pay)
│   │   ├── contact.tsx             # Contact form
│   │   ├── Dictionary.tsx          # Dictionnaire
│   │   └── admin/                  # Pages admin
│   ├── 📁 hooks/                    # Custom React hooks
│   │   ├── usePosts.ts             # CRUD posts
│   │   ├── useAdminData.ts         # Admin data hooks
│   │   └── use-toast.ts            # Toast notifications
│   ├── 📁 services/                 # API calls
│   │   └── api.ts                  # Axios instance + JWT interceptor
│   ├── 📁 lib/                      # Utilities & contexts
│   │   ├── ThemeContext.tsx        # Dark/Light theme
│   │   ├── ContentContext.tsx      # Global content state
│   │   └── utils.ts                # Helper functions
│   ├── 📁 i18n/                     # Internationalization
│   │   ├── config.ts               # i18next setup
│   │   └── 📁 locales/
│   │       ├── 📁 fr/              # Français
│   │       ├── 📁 en/              # English
│   │       └── 📁 swa/             # Swahili
│   ├── App.tsx                      # Root component
│   ├── main.tsx                     # Entry point
│   └── index.css                    # Global styles
│
├── 📁 server/                       # Backend Express
│   ├── 📁 src/
│   │   ├── 📁 controllers/          # Business logic
│   │   │   ├── authController.ts
│   │   │   ├── contentController.ts
│   │   │   ├── paymentController.ts
│   │   │   ├── contactController.ts
│   │   │   ├── newsletterController.ts
│   │   │   └── settingsController.ts
│   │   ├── 📁 routes/               # API endpoints
│   │   │   ├── authRoutes.ts
│   │   │   ├── contentRoutes.ts
│   │   │   ├── paymentRoutes.ts
│   │   │   ├── contactRoutes.ts
│   │   │   ├── newsletterRoutes.ts
│   │   │   └── settingsRoutes.ts
│   │   ├── 📁 services/             # External services
│   │   │   ├── authService.ts       # JWT & bcrypt
│   │   │   ├── emailService.ts      # Nodemailer
│   │   │   ├── stripeService.ts     # Stripe integration
│   │   │   └── maishapayService.ts  # Maisha Pay
│   │   ├── 📁 middleware/           # Express middleware
│   │   │   ├── auth.ts              # JWT verification
│   │   │   └── error.ts             # Global error handling
│   │   ├── 📁 utils/                # Utilities
│   │   │   └── AppError.ts          # Custom error class
│   │   ├── 📁 config/               # Configuration
│   │   │   ├── index.ts             # Environment variables
│   │   │   └── swagger.ts           # Swagger docs
│   │   ├── app.ts                   # Express app setup
│   │   └── server.ts                # Server entry point
│   ├── 📁 prisma/
│   │   ├── schema.prisma            # Database schema
│   │   └── 📁 migrations/           # Database migrations
│   ├── 📁 uploads/                  # User uploaded files
│   └── package.json
│
├── 📄 .env.example                  # Environment variables template
├── 📄 .gitignore
├── 📄 package.json                  # Root config (Frontend)
├── 📄 README.md                     # Ce fichier
└── 📄 vite.config.ts                # Vite configuration
```

---

## 🗄️ Modèle de Données

### Prisma Schema (SQLite)

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String   (bcrypt hashed)
  name      String
  role      String   @default("editor")  # admin, editor, viewer
  avatar    String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        String   @id @default(uuid())
  type      String   # about | programme | evenement | carousel | activite | partenaire | timeline
  title     String
  content   String
  category  String?
  date      String
  endDate   String?
  status    String   @default("draft")  # draft | published
  imageUrl  String?  # URL de l'image uploadée
  author    String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model NewsletterSubscription {
  id        String   @id @default(uuid())
  email     String   @unique
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model ContactMessage {
  id        String   @id @default(uuid())
  name      String
  email     String
  subject   String?
  message   String
  isRead    Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model SiteSettings {
  id              String   @id @default("default")
  facebookUrl     String?
  twitterUrl      String?
  instagramUrl    String?
  linkedinUrl     String?
  missionVideoUrl String?
  updatedAt       DateTime @updatedAt
}
```

---

## 🚀 Installation

### Prérequis

- **Node.js** v18+ et **npm** 9+
- **Git** pour le versioning
- **Visual Studio Code** (recommandé) ou tout autre IDE

### Étapes d'Installation

#### 1️⃣ Cloner le Repository

```bash
git clone https://github.com/kamite2000/asafs.git
cd asafs
```

#### 2️⃣ Installer les Dépendances Frontend

```bash
npm install
```

#### 3️⃣ Installer les Dépendances Backend

```bash
cd server
npm install
cd ..
```

#### 4️⃣ Configurer les Variables d'Environnement

**Frontend** (à la racine `.env.local`):
```env
VITE_API_URL=http://localhost:3000
```

**Backend** (dans `server/.env`):
```env
# Database
DATABASE_URL="file:./dev.db"

# Server
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=your_super_secret_jwt_key_min_32_chars

# SMTP (Email)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM="ASAFS <noreply@asafs.org>"

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxx

# Maisha Pay
MAISHA_PAY_API_KEY=your_api_key
MAISHA_PAY_MERCHANT_ID=your_merchant_id

# URLs
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:3000
```

Voir `.env.example` pour plus de détails.

#### 5️⃣ Initialiser la Base de Données

```bash
cd server
npm run prisma:migrate
npm run prisma:generate
cd ..
```

---

## ⚙️ Configuration

### Variables d'Environnement Essentielles

#### Backend

| Variable | Description | Exemple |
|----------|-------------|---------|
| `DATABASE_URL` | URL connexion SQLite | `file:./dev.db` |
| `PORT` | Port serveur | `3000` |
| `NODE_ENV` | Environnement | `development \| production` |
| `JWT_SECRET` | Secret JWT | Min 32 caractères |
| `STRIPE_SECRET_KEY` | Clé API Stripe | `sk_test_xxxx` |
| `MAISHA_PAY_API_KEY` | Clé Maisha Pay | `your_key` |
| `SMTP_HOST` | Serveur email | `smtp.gmail.com` |

#### Frontend

| Variable | Description | Exemple |
|----------|-------------|---------|
| `VITE_API_URL` | URL de l'API backend | `http://localhost:3000` |

### Obtenir les Clés API

**Stripe:**
1. Aller sur https://dashboard.stripe.com
2. Créer un compte ou se connecter
3. Copier la clé secrète de test

**Maisha Pay:**
1. S'inscrire sur https://maishapay.com
2. Créer une application
3. Récupérer les credentials

---

## 🎬 Démarrage

### Mode Développement (Frontend + Backend)

```bash
# À la racine du projet
npm start
```

Cela lancera:
- 🎨 Frontend React: http://localhost:5173
- 🔧 Backend Express: http://localhost:3000
- 📚 Swagger Docs: http://localhost:3000/api-docs

### Frontend Seulement

```bash
npm run dev
```

### Backend Seulement

```bash
npm run dev:server
```

---

## 📜 Scripts Disponibles

### Root (Frontend)

```bash
npm run dev              # Frontend Vite dev server
npm run dev:server       # Backend Express dev server
npm start               # Frontend + Backend (concurrently)
npm run build           # Build production Vite
npm run build:dev       # Build development
npm run lint            # Linter ESLint
npm run preview         # Preview build local
```

### Backend (`cd server`)

```bash
npm run dev             # Watch mode avec tsx
npm run build           # Compiler TypeScript
npm run start           # Lancer le serveur compilé
npm run prisma:migrate  # Créer migrations
npm run prisma:generate # Générer Prisma client
```

---

## 🌐 API REST Endpoints

### Authentication
```
POST   /api/auth/login              # Login (email + password) → JWT
POST   /api/auth/register           # Register admin
```

### Content (Posts/Programmes)
```
GET    /api/posts                   # Fetch all posts (filtrage: type, status)
GET    /api/posts/:id               # Fetch single post
POST   /api/posts                   # Create post (protected, FormData + image)
PUT    /api/posts/:id               # Update post (protected)
DELETE /api/posts/:id               # Delete post (protected)
```

### Newsletter
```
POST   /api/newsletter              # Subscribe
DELETE /api/newsletter/:email       # Unsubscribe (protected)
GET    /api/newsletter              # Get all subscribers (protected)
```

### Contact
```
POST   /api/contact                 # Submit contact form
GET    /api/contact                 # Get all messages (protected)
PATCH  /api/contact/:id/read        # Mark as read (protected)
DELETE /api/contact/:id             # Delete message (protected)
```

### Payments
```
POST   /api/payments/initiate       # Initiate donation (Stripe/Maisha Pay)
POST   /api/payments/webhook/stripe # Stripe webhook
POST   /api/payments/webhook/maisha # Maisha Pay webhook
```

### Settings
```
GET    /api/settings                # Get site settings
PUT    /api/settings                # Update settings (protected)
```

**Documentation Swagger complète:** http://localhost:3000/api-docs

---

## 🔐 Authentification & Sécurité

### JWT Flow

1. **Login** → Email + Password → Backend hash + compare
2. **Token Generation** → JWT signé avec secret (expire 90 jours)
3. **Storage** → localStorage (`asafs_user` JSON)
4. **Requests** → Axios interceptor ajoute header `Authorization: Bearer {token}`
5. **Verification** → Middleware `authenticateToken` vérifie JWT

### Password Security

- ✅ Bcrypt hasher (round 12)
- ✅ Never store plain text
- ✅ Compare hashs during login

### API Security

- ✅ CORS configuré
- ✅ Helmet pour headers de sécurité
- ✅ Rate limiting (à implémenter)
- ✅ Input validation avec Zod
- ✅ JWT verification middleware
- ✅ Error messages génériques

---

## 🌍 Internationalisation (i18n)

Support de 3 langues:

- 🇫🇷 **Français** (FR) - Défaut
- 🇬🇧 **English** (EN)
- 🇹🇿 **Swahili** (SWA)

### Structure i18n

```
src/i18n/
├── config.ts                    # Configuration i18next
└── locales/
    ├── fr/translation.json      # Clés français
    ├── en/translation.json      # Clés anglais
    └── swa/translation.json     # Clés swahili
```

### Utilisation

```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation();
  
  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <button onClick={() => i18n.changeLanguage('en')}> 
        English
      </button>
    </div>
  );
}
```

---

## 💳 Intégration Paiements

### Stripe Integration

```typescript
// Frontend - Initiate donation
const { data } = await api.post('/payments/initiate', {
  amount: 50,
  currency: 'USD',
  method: 'stripe',
  personalInfo: { firstName, email }
});

// Redirect vers Stripe Checkout
window.location.href = data.url;
```

### Maisha Pay (Mobile Money)

Support de:
- 📱 M-Pesa (Kenya)
- 📱 Orange Money (RDC, etc.)
- 📱 Airtel Money
- 📱 Maisha Pay Direct

```typescript
// Frontend - Mobile Money Payment
const { data } = await api.post('/payments/initiate', {
  amount: 25000,
  currency: 'CDF',
  method: 'mpesa',
  phone: '+243812345678',
  personalInfo: { firstName, email }
});
```

---

## 🚀 Déploiement

### Frontend

**Vercel (Recommandé)**
```bash
npm run build
# Push to GitHub
# Vercel auto-détecte et déploie
```

**Netlify**
```bash
npm run build
# Drag & drop le dossier 'dist'
```

**Self-hosted**
```bash
npm run build
# Servir le dossier 'dist' avec nginx/apache
```

### Backend

**Heroku**
```bash
# Ajouter Procfile:
web: npm run start

# Push:
git push heroku main
```

**Railway.app**
```bash
# Connecter repo GitHub
# Configuration automatique
```

**VPS/Server**
```bash
# SSH sur le serveur
git clone <repo>
cd asafs/server
npm install
npm run build
npm start

# Utiliser PM2 pour gestion processus:
pm2 start dist/server.js --name "asafs-api"
```

### Database (SQLite → Production)

⚠️ **Pour production**, considérer:
- **PostgreSQL** (recommandé) pour scalabilité
- **MySQL** pour performance
- Changer Prisma datasource:
  ```prisma
datasource db {
  provider = "postgresql"  # ou "mysql"
  url      = env("DATABASE_URL")
  }
  ```

---

## 🤝 Contribution

### Workflow

1. **Fork** le repository
2. **Créer une branche** (`git checkout -b feature/amazing-feature`)
3. **Commit les changements** (`git commit -m 'Add amazing feature'`)
4. **Push vers la branche** (`git push origin feature/amazing-feature`)
5. **Ouvrir une Pull Request**

### Guidelines

- ✅ Respecter le style de code existant
- ✅ Ajouter des tests si possible
- ✅ Documenter les changements majeurs
- ✅ Utiliser TypeScript
- ✅ Messages de commit clairs et descriptifs

### Rapport de Bugs

Ouvrir une [Issue GitHub](https://github.com/kamite2000/asafs/issues) avec:
- Description du bug
- Étapes pour reproduire
- Comportement attendu vs actuel
- Screenshots si pertinent

---

## 📚 Documentation & Ressources

### Official Docs
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Express.js Guide](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)

### Tutorials
- [React Query Docs](https://tanstack.com/query/latest)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [i18next Guide](https://www.i18next.com/overview/getting-started)

---

## 🆘 Support & Aide

### Besoin d'Aide?

- 📖 Consulte la [Documentation](#-documentation--ressources)
- 🐛 Crée une [Issue GitHub](https://github.com/kamite2000/asafs/issues)
- 💬 Utilise les [GitHub Discussions](https://github.com/kamite2000/asafs/discussions)
- ✉️ Contacte l'équipe: [contact@asafs.org](mailto:contact@asafs.org)

### Problèmes Courants

**Port déjà utilisé?**
```bash
# Linux/Mac
lsof -i :5173    # Frontend
lsof -i :3000    # Backend

# Windows
netstat -ano | findstr :5173
```

**Base de données corrompue?**
```bash
cd server
rm prisma/dev.db
npm run prisma:migrate
npm run prisma:generate
```

**JWT expiré?**
```
Effacer localStorage et re-login
localStorage.clear()
```

---

## 📄 Licence

Ce projet est sous licence **ISC**.

---

## 👨‍💻 Auteurs & Contributeurs

- **Développeur Principal**: [Felicien Mukamba Aumsoft](https://aumsoft.com)
- **Repository**: [kamite2000/asafs](https://github.com/kamite2000/asafs)

---

## 🎉 Remerciements

Un grand merci à:
- La communauté React & TypeScript
- Les contributeurs du projet
- Tous les utilisateurs et testeurs

---

<div align="center">

**Made with ❤️ for the African Sign Language Community**

[⬆ Retour au début](#-asafs---african-sign-language--french-support-platform)

</div>
