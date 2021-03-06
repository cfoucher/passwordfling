# Password Fling

## Running locally

```
git clone git@github.com:cfoucher/passwordfling.git
cd passwordfling
npm install

cd client
npm install

cd ..
npm start
```

## Overview
Small React app to easily and securely pass long complex passwords (or any text) between two devices.
Use QR codes and WebRTC, with Express as the backend server.

## Deploying

### Heroku

The app is ready to be deployed to Heroku.

In production, Heroku will use `Procfile` which boots just the server:

```
web: npm run server
```

Inside `server.js`, we tell Node/Express we'd like it to serve static assets in production:

```
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
```

You just need to have Webpack produce a static bundle of the React app (below).

### Steps

We assume basic knowledge of Heroku.

**0. Setup your Heroku account and Heroku CLI**

For installing the CLI tool, see [this article](https://devcenter.heroku.com/articles/heroku-command-line).

**1. Build the React app**

Running `npm run build` creates the static bundle which we can then use any HTTP server to serve:

```
cd client/
npm run build
```

**2. Commit the `client/build` folder to source control**

From the root of the project:

```
git add client/build
git commit -m 'Adding `build` to source control'
```

**3. Create the Heroku app**

```
heroku apps:create passwordfling
```

**4. Push to Heroku**

```
git push heroku master
```

Heroku will give you a link at which to view your live app.


### Initial Base
https://github.com/fullstackreact/food-lookup-demo