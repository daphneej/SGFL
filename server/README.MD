# SGFL - Documentation de l'API

Bienvenue dans la documentation de l'API de l'application de système de gestion de formation en ligne (SGFL). Cette documentation explique comment utiliser l'API pour développer la partie frontend de l'application SGFL. Assurez-vous d'avoir accès au projet SGFL sur GitHub à l'adresse suivante : [https://github.com/daphneej/SGFL](https://github.com/daphneej/SGFL).

## Configuration du serveur

Avant de commencer à utiliser l'API SGFL, vous devez configurer le serveur. Le serveur est situé dans le dossier "server" du projet SGFL. Assurez-vous d'avoir créé votre propre dossier "client" pour la partie frontend.

### Variables d'environnement

Le serveur utilise des variables d'environnement pour la configuration. Vous devez créer un fichier `.env` dans le dossier "server" et y définir les variables suivantes :

```
PORT=8000
NODE_ENV=development
JWT_SECRET="28f5a11e0d5f6e96d6e2f4031ee4e6f52b304cf0"
DATABASE_URL="mysql://username:password@host:port/database"
```

Assurez-vous de remplacer les valeurs par les paramètres appropriés pour votre configuration.

### Installation des dépendances

Pour installer les dépendances du projet, assurez-vous d'exécuter la commande suivante dans le dossier "server" :

```bash
npm install
```

Cela installera automatiquement toutes les dépendances requises, y compris Prisma.

### Configuration de Prisma

Prisma est utilisé comme ORM (Object-Relational Mapping) pour la communication avec la base de données. La configuration de Prisma est déjà incluse dans le projet SGFL.

Pour générer le client Prisma et effectuer les migrations de base de données, exécutez les commandes suivantes dans le dossier "server" :

```bash
npx prisma generate
npx prisma migrate dev
```

Ces commandes génèrent le client Prisma en utilisant la configuration définie dans le fichier `schema.prisma` et effectuent les migrations de base de données pour synchroniser la structure de la base de données avec votre modèle Prisma.

Vous êtes maintenant prêt à utiliser Prisma dans votre code pour interagir avec la base de données.

## Utilisation de l'API

Une fois le serveur configuré et les dépendances installées, vous pouvez utiliser l'API SGFL pour effectuer différentes opérations liées aux utilisateurs et aux cours.

### Utilisateurs

L'API offre les fonctionnalités suivantes pour les utilisateurs :

#### Inscription d'un nouvel utilisateur

```http
POST /api/users/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Connexion d'un utilisateur

```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Déconnexion d'un utilisateur

```http
POST /api/users/logout
```

#### Récupération du profil d'un utilisateur connecté

```http
GET /api/users/profile
```

#### Mise à jour des informations d'un utilisateur connecté

```http
PUT /api/users/update
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith"
}
```

#### Suppression d'un utilisateur connecté

```http
DELETE /api/users/delete
```

### Cours

L'API offre les fonctionnalités suivantes pour les cours :

#### Création d'un nouveau cours

```http
POST /api/courses
Content-Type: application/json

{
  "title": "Course Title",
  "description": "Course Description",
  "price": 99.99
}
```

#### Récupération de tous les cours

```http
GET /api/courses
```

#### Récupération d'un cours spécifique

```http
GET /api/courses/:id
```

#### Mise à jour d'un cours existant

```http
PUT /api/courses/:id
Content-Type: application/json

{
  "title": "New Course Title"
}
```

#### Suppression d'un cours existant

```http
DELETE /api/courses/:id
```

Toutes les routes pour les cours nécessitent une authentification. Assurez-vous d'inclure le jeton d'authentification dans l'en-tête des requêtes.

## Exemples d'utilisation

Voici quelques exemples d'utilisation de l'API :

#### Exemple d'inscription d'un nouvel utilisateur

```http
POST /api/users/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Exemple de connexion d'un utilisateur

```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Exemple de création d'un nouveau cours

```http
POST /api/courses
Content-Type: application/json

{
  "title": "Course Title",
  "description": "Course Description",
  "price": 99.99
}
```

#### Exemple de mise à jour des informations d'un utilisateur connecté

```http
PUT /api/users/update
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith"
}
```

N'hésitez pas à utiliser ces exemples pour tester l'API SGFL et explorer ses fonctionnalités.

## Déploiement de l'API

L'API SGFL est également déployée et accessible via le lien suivant : [https://sgfl.onrender.com](https://sgfl.onrender.com). Vous pouvez utiliser cette version déployée pour tester l'API sans avoir à configurer localement le serveur.

## Conclusion

Félicitations ! Vous avez maintenant accès à l'API de l'application SGFL et vous savez comment la configurer et l'utiliser pour développer la partie frontend. N'hésitez pas à consulter les fichiers de code source du projet SGFL pour plus d'exemples et de détails sur les fonctionnalités de l'API.

Si vous avez des questions ou des problèmes, n'hésitez pas à contacter l'équipe de développement. Bon développement !
