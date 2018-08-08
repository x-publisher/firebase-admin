# Admin panel for Firebase projects

# Installation
### Install firebaset-cli
`$ npm install -g firebase-tools`

### Clone repo
`$ git clone #repo-url`

### Go to project dir
`$ cd admin-panel`

### Install deps
`$ npm install` | `$ yarn install`

### Start local development
`$ npm start` | `$ yarn start`

# Configuration
Make sure you use right config for firebase project and right credentioals for signing in to interact with database.

Rename `.env.example` to `.env` and add your credentials.

You must create user in your firebase app console and use its credentials:
```
email: REACT_APP_FIREBASE_ADMIN_EMAIL
password: REACT_APP_FIREBASE_ADMIN_PASSWORD
```

Don't forget to set right access to database in firebae app console:
```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
  }
}
```

# Deploy
### Make sure you selected firebase project
`$ firebase use #project-name`

https://firebase.google.com/docs/hosting/quickstart

### Build project
`$ npm run build` | `$ yarn build`

### Deploy project
`$ npm run deploy` | `$ yarn deploy`

Note: it will hosted in firebase using this project. You can also get project build (/build folder) and host it everywhere.

# Live example
Example app https://imp-app-8eb8b.firebaseapp.com/clubs

# Database shape
Database must have shape like this
https://imp-app-8eb8b.firebaseio.com/.json