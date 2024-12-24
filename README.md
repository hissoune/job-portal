# Consultation des Offres d'Emploi

## Table des Matières
- [Description](#description)
- [Fonctionnalités](#fonctionnalités)
  - [Consultation des Offres](#consultation-des-offres)
  - [Gestion des Candidatures](#gestion-des-candidatures)
  - [Administration](#administration)
- [Technologies Utilisées](#technologies-utilisées)
- [Installation et Lancement](#installation-et-lancement)
  - [Prérequis](#prérequis)
  - [Installation](#installation)
  - [Lancement](#lancement)
- [Conventions API](#conventions-api)
- [Authentification](#authentification)
- [Tests](#tests)
- [Documentation API](#documentation-api)
- [Pipeline CI/CD](#pipeline-cicd)

## Description
Ce projet permet de consulter des offres d’emploi, de postuler directement, et de suivre l’état de ses candidatures. Il propose également une interface administrateur pour la gestion des candidatures.

## Fonctionnalités

### Consultation des Offres
- Affichage des offres d’emploi en consommant une API tierce.
- Recherche et filtrage par :
  - Titre
  - Localisation
  - Type de contrat

### Gestion des Candidatures
- Création de compte utilisateur.
- Connexion utilisateur.
- Possibilité de postuler à des offres directement depuis l’application.
- Suivi de l’état des candidatures :
  - En attente
  - Acceptée
  - Refusée

### Administration
- Visualisation des candidatures reçues.
- Ajout de notes aux candidatures.
- Mise à jour du statut des candidatures.

## Technologies Utilisées
- **Framework Frontend** : [Next.js](https://nextjs.org/)
- **UI** : [Tailwind CSS](https://tailwindcss.com/) ou autre framework CSS.
- **Base de Données** :
  - MongoDB avec [Mongoose](https://mongoosejs.com/)
  - ou PostgreSQL
- **Gestion de l'état** : React Context ou Redux.
- **Authentification** : [JSON Web Token (JWT)](https://jwt.io/) ou un service tiers.
- **CI/CD** : [GitHub Actions](https://github.com/features/actions) ou [GitLab CI](https://docs.gitlab.com/ee/ci/).
- **Tests API** : [Supertest](https://github.com/visionmedia/supertest) et [Jest](https://jestjs.io/).
- **Documentation API** : [Swagger](https://swagger.io/).

## Installation et Lancement

### Prérequis
- Node.js v14 ou plus.
- NPM ou Yarn.
- MongoDB/PostgreSQL installé.
- Un fichier `.env` pour les variables d’environnement.

### Installation
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/hissoune/job-portal.git
   ```
2. Installez les dépendances :
   ```bash
   cd nom-du-projet
   npm install
   ```
3. Configurez les variables d’environnement dans un fichier `.env`.

### Lancement
- **Développement** :
  ```bash
  npm run dev
  ```
- **Production** :
  ```bash
  npm run build
  npm start
  ```

## Conventions API
L'API respecte les conventions RESTful et inclut une gestion de la pagination avec les paramètres suivants :
- `page` : Numéro de page.
- `size` : Nombre d’éléments par page.
- `offset` : Décalage des éléments.

## Authentification
- Utilisation de JSON Web Tokens (JWT) pour l’authentification.
- Possibilité d’intégration avec un service tiers pour une authentification simplifiée.

## Tests
- **Tests End-to-End (E2E)** :
  - Utilisation de Supertest pour tester les routes API.
- **Framework de Tests** : Jest pour les assertions et les tests unitaires.

Lancer les tests :
```bash
npm test
```

## Documentation API
La documentation de l'API est générée avec Swagger. Pour accéder à la documentation, lancez l’application et visitez :
```
http://localhost:3000/api-docs
```

## Pipeline CI/CD
- Implémentation d’un pipeline CI/CD avec GitHub Actions ou GitLab CI pour automatiser les tests, le déploiement et la livraison continue.

---

**Contact** : Si vous avez des questions, veuillez contacter l’équipe de développement à [khalidhissoune962@gmail.com](khalidhissoune962@gmail.com).

