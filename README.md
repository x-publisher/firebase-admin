# Admin panel for Firebase projects

# Configuration
Make sure you use right config for firebase project and right credentioals for signing in to interact with database:

`/src/config/firebase.js`

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