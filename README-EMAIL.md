# 📧 Configuration Email - Formulaire de Contact

## 🚀 **Solution Simple : Resend (Gratuit)**

### **1. Créer un compte Resend**
- Va sur [resend.com](https://resend.com)
- Crée un compte gratuit
- Vérifie ton email

### **2. Obtenir la clé API**
- Dans ton dashboard Resend
- Clique sur "API Keys"
- Crée une nouvelle clé
- Copie la clé (commence par `re_`)

### **3. Configurer le projet**
Crée un fichier `.env.local` dans ton projet :
```bash
RESEND_API_KEY=re_ta_cle_api_ici
```

### **4. Tester**
- Redémarre le serveur : `npm run dev`
- Va sur la page contact
- Envoie un message de test
- **Sacha recevra l'email directement !** 🎉

## 📋 **Ce que reçoit Sacha**

**Email avec :**
- ✅ Nom et prénom
- ✅ Email de contact
- ✅ Téléphone
- ✅ Message complet
- ✅ Date et heure
- ✅ Possibilité de répondre directement

## 🔧 **Alternative : Gmail (Plus complexe)**

Si tu préfères Gmail, il faut :
1. Activer l'authentification à 2 facteurs
2. Générer un mot de passe d'application
3. Configurer SMTP

**Resend est plus simple et fiable !** ✨ 