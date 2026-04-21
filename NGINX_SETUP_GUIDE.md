# Guide d'Installation Nginx pour ASAF Platform

## Architecture du Projet

L'analyse du projet ASAF Platform révèle une architecture moderne full-stack :

### Frontend (React + TypeScript)
- **Framework**: React 18.3.1 avec TypeScript
- **Build Tool**: Vite 7.3.0
- **UI Components**: Radix UI + Shadcn/ui
- **Styling**: TailwindCSS
- **Routing**: React Router DOM
- **State Management**: TanStack Query
- **Internationalisation**: i18next

### Backend (Node.js + Express)
- **Framework**: Express.js 5.2.1
- **Database**: Prisma ORM avec SQLite
- **Authentication**: JWT + bcryptjs
- **File Uploads**: Multer
- **API Documentation**: Swagger
- **Security**: Helmet, CORS

### Dashboard Admin
- **Route**: `/admin`
- **Authentification**: Système d'auth dédié (`AdminAuth.tsx`)
- **Pages**: Dashboard, Index admin

## Configuration Nginx Professionnelle

Le fichier `nginx-production.conf` fournit une configuration complète et sécurisée pour :

### Sécurité
- **SSL/TLS**: TLS 1.2/1.3 avec chiffrement fort
- **Headers de sécurité**: CSP, HSTS, X-Frame-Options, etc.
- **Protection anti-attaques**: XSS, Clickjacking, CSRF

### Performance
- **Compression Gzip**: Optimisation des assets
- **Cache intelligent**: Différentes durées selon le type de fichier
- **HTTP/2**: Multiplexage des requêtes

### Routage
- **Frontend**: Route principale vers l'application React
- **Admin**: Route `/admin` avec sécurité renforcée
- **API**: Proxy vers le backend Node.js (port 3000)
- **Uploads**: Servir les fichiers uploadés

## Instructions d'Installation

### 1. Prérequis
```bash
# Mettre à jour le système
sudo apt update && sudo apt upgrade -y

# Installer Nginx
sudo apt install nginx -y

# Installer Certbot pour SSL
sudo apt install certbot python3-certbot-nginx -y
```

### 2. Déployer l'Application
```bash
# Cloner le projet
git clone <repository-url>
cd asafs

# Installer les dépendances
npm install
cd server && npm install && cd ..

# Build le frontend
npm run build

# Démarrer le backend (en production)
cd server && npm run start
# ou avec PM2 pour la production
pm2 start dist/server.js --name asafs-backend
```

### 3. Configurer Nginx
```bash
# Copier la configuration
sudo cp nginx-production.conf /etc/nginx/sites-available/asafsourdes.org

# Créer le lien symbolique
sudo ln -s /etc/nginx/sites-available/asafsourdes.org /etc/nginx/sites-enabled/

# Supprimer la configuration par défaut
sudo rm /etc/nginx/sites-enabled/default

# Tester la configuration
sudo nginx -t
```

### 4. Configurer SSL
```bash
# Obtenir le certificat SSL
sudo certbot --nginx -d asafsourdes.org -d www.asafsourdes.org

# Ajouter le sous-domaine API (optionnel)
sudo certbot --nginx -d api.asafsourdes.org
```

### 5. Redémarrer Nginx
```bash
sudo systemctl restart nginx
sudo systemctl enable nginx
```

## Structure des Fichiers

```
/var/www/asafsourdes.org/
├── dist/                    # Build du frontend React
│   ├── index.html
│   ├── assets/
│   └── admin/              # Pages admin
├── server/
│   ├── uploads/            # Fichiers uploadés
│   └── dist/               # Build du backend
└── logs/                   # Logs Nginx
```

## Configuration des Ports

- **Frontend (Nginx)**: 80 (HTTP) → 443 (HTTPS)
- **Backend (Node.js)**: 3000 (interne)
- **Database**: SQLite (fichier local)

## Monitoring et Logs

### Logs Nginx
```bash
# Logs d'accès
sudo tail -f /var/log/nginx/asafsourdes.org.access.log

# Logs d'erreurs
sudo tail -f /var/log/nginx/asafsourdes.org.error.log

# Logs API
sudo tail -f /var/log/nginx/api.asafsourdes.org.access.log
```

### Health Check
L'application expose un endpoint `/health` pour le monitoring :
```bash
curl https://asafsourdes.org/health
```

## Sécurité Supplémentaire

### Firewall
```bash
# Configurer UFW
sudo ufw allow 'Nginx Full'
sudo ufw allow ssh
sudo ufw enable
```

### Fail2Ban
```bash
# Installer Fail2Ban
sudo apt install fail2ban -y

# Configurer pour Nginx
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
# Éditer la configuration pour activer les filtres Nginx
```

## Maintenance

### Mise à jour SSL
```bash
# Renouvellement automatique (déjà configuré par Certbot)
sudo certbot renew --dry-run
```

### Redémarrage des services
```bash
# Redémarrer Nginx
sudo systemctl reload nginx

# Redémarrer le backend
pm2 restart asafs-backend
```

## Dépannage

### Problèmes courants
1. **Erreur 502 Bad Gateway**: Le backend n'est pas démarré
2. **Erreur 404**: Vérifier les chemins dans la configuration Nginx
3. **SSL non valide**: Vérifier la configuration Certbot

### Commandes utiles
```bash
# Vérifier le statut Nginx
sudo systemctl status nginx

# Vérifier les ports ouverts
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :443

# Tester la configuration Nginx
sudo nginx -t
```

## Performance

### Optimisations recommandées
- **CDN**: CloudFlare pour la distribution globale
- **Cache Redis**: Pour les sessions et données fréquemment accédées
- **Database**: Migration vers PostgreSQL pour la production
- **Load Balancing**: Nginx en mode load balancer pour la scalabilité

Cette configuration assure une production robuste, sécurisée et performante pour l'application ASAF Platform.
