# Admin panel for Firebase projects

## Installation
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

## Deploy
### Make sure you selected firebase project
`$ firebase use #project-name`

https://firebase.google.com/docs/hosting/quickstart

### Build project
`$ npm run build` | `$ yarn build`

### Deploy project
`$ npm run deploy` | `$ yarn deploy`

Note: it will hosted in firebase using this project. You can also get project build (/build folder) and host it everywhere.