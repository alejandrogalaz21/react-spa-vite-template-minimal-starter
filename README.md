## Prerequisites

- Node.js 20.x (Recommended)

## Installation

**Using Yarn (Recommended)**

```sh
yarn install
yarn dev
```

**Using Npm**

```sh
npm i
npm run dev
```

## Build

```sh
yarn build
# or
npm run build
```

## Mock server

By default we provide demo data from : `https://api-dev-minimal-[version].vercel.app`

To set up your local server:

- **Guide:** [https://docs.minimals.cc/mock-server](https://docs.minimals.cc/mock-server).

- **Resource:** [Download](https://www.dropbox.com/sh/6ojn099upi105tf/AACpmlqrNUacwbBfVdtt2t6va?dl=0).

## Full version

- Create React App ([migrate to CRA](https://docs.minimals.cc/migrate-to-cra/)).
- Next.js
- Vite.js

## Starter version

- To remove unnecessary components. This is a simplified version ([https://starter.minimals.cc/](https://starter.minimals.cc/))
- Good to start a new project. You can copy components from the full version.
- Make sure to install the dependencies exactly as compared to the full version.

---

**NOTE:**
_When copying folders remember to also copy hidden files like .env. This is important because .env files often contain environment variables that are crucial for the application to run correctly._

## env

```txt
# App
VITE_BASE_PATH=
VITE_SERVER_URL=https://api-dev-minimal-v6.vercel.app
VITE_ASSET_URL=https://api-dev-minimal-v6.vercel.app

# Mapbox
VITE_MAPBOX_API_KEY=

# Firebase
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APPID=

# Aws
VITE_AWS_AMPLIFY_USER_POOL_ID=
VITE_AWS_AMPLIFY_USER_POOL_WEB_CLIENT_ID=
VITE_AWS_AMPLIFY_REGION=

# Auth0
VITE_AUTH0_DOMAIN=
VITE_AUTH0_CLIENT_ID=
VITE_AUTH0_CALLBACK_URL=

# Supabase
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

```

## demo

[demo](http://starter-vite-ts.s3-website-us-east-1.amazonaws.com/)
