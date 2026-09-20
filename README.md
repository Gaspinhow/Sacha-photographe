# 🎯 Site Photographe Professionnel - Sacha Nahum

Site web moderne et responsive pour photographe professionnel, développé avec Next.js et Tailwind CSS.

## ✨ **Fonctionnalités**

- 🖼️ **Galerie d'images** avec catégorisation
- 📱 **Design responsive** (mobile, tablet, desktop)
- 📧 **Formulaire de contact** fonctionnel
- 🎨 **Interface moderne** avec animations fluides
- 🚀 **Performance optimisée** avec Next.js
- 🌈 **Thème blanc** avec accent coloré

## 🛠️ **Technologies**

- **Frontend:** Next.js 14, React 18
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Images:** Next.js Image Optimization
- **Email:** Nodemailer (API route)
- **Deployment:** Vercel

## 🚀 **Déploiement sur Vercel**

### **Étape 1: Préparer le Repository**

```bash
# Cloner le projet
git clone <votre-repo-url>
cd cars1

# Installer les dépendances
npm install

# Tester en local
npm run dev
```

### **Ajouter des photos**

Les photos affichées sont les WebP de `public/images-compressed`. Les originaux
ne sont pas dans le dépôt : ils sont sauvegardés sur le bureau
(`photos-originales-sacha` et `photos-originales-sacha-corporate`).

Pour ajouter des photos :

```bash
# 1. Déposer les originaux (jpg/png) dans public/images
# 2. Les compresser en WebP
node scripts/compress-images.mjs

# 3. Générer les déclinaisons (400, 800, 1200 px) et le manifeste de dimensions
npm run images

# 4. Référencer les nouveaux fichiers dans la fiche projet de data/projects
```

`npm run images` est à relancer après tout ajout ou remplacement de photo :
sans lui, la nouvelle image s'affichera en pleine taille sur téléphone et la
page sursautera pendant le chargement.

### **Étape 2: Déployer sur Vercel**

1. **Aller sur [vercel.com](https://vercel.com)**
2. **Connecter votre compte GitHub**
3. **Importer le repository**
4. **Configurer les variables d'environnement**

### **Étape 3: Variables d'Environnement**

Dans Vercel, ajouter ces variables :

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-app-password
```

### **Étape 4: Déploiement Automatique**

- ✅ **Push sur main** → Déploiement automatique
- ✅ **Prévisualisation** des changements
- ✅ **Rollback** en 1 clic
- ✅ **Monitoring** des performances

## 📁 **Structure du Projet**

```
cars1/
├── app/                    # Pages Next.js
│   ├── about/            # Page À propos
│   ├── contact/          # Page Contact
│   ├── gallery/          # Page Galerie
│   ├── api/              # API Routes
│   └── globals.css       # Styles globaux
├── components/            # Composants React
├── data/                 # Données des projets
├── public/               # Images et assets
└── tailwind.config.js    # Configuration Tailwind
```

## 🎨 **Personnalisation**

### **Couleurs**
- **Accent:** `#FF6B6B` (rouge corail)
- **Background:** `#ffffff` (blanc)
- **Text:** `#1a1a1a` (gris foncé)

### **Images**
- **Format:** JPEG optimisé
- **Taille:** 400x300px (responsive)
- **Organisation:** Par projet/catégorie

## 📧 **Configuration Email**

Le formulaire de contact utilise Gmail SMTP :

1. **Activer l'authentification 2FA** sur Gmail
2. **Générer un mot de passe d'application**
3. **Configurer les variables SMTP** dans Vercel

## 🔧 **Maintenance**

### **Mise à Jour du Site**

```bash
# Modifier le code
git add .
git commit -m "Description des changements"
git push origin main

# Déploiement automatique sur Vercel
```

### **Monitoring**

- **Analytics** en temps réel
- **Logs** des erreurs
- **Performance** des pages
- **Uptime** du site

## 🌐 **Domaines**

- **Vercel:** `votre-projet.vercel.app`
- **Personnalisé:** Configurable dans Vercel
- **SSL:** Automatique et gratuit

## 📱 **Responsive Design**

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px  
- **Desktop:** > 1024px

## 🚀 **Performance**

- **Lighthouse Score:** 90+
- **Core Web Vitals:** Optimisés
- **Images:** Lazy loading + optimisation
- **Bundle:** Tree shaking + minification

## 📞 **Support**

Pour toute question ou problème :
- **Documentation:** Ce README
- **Issues:** GitHub repository
- **Vercel:** Dashboard de déploiement

---

**Développé avec ❤️ pour Sacha Nahum** 