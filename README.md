# bookstore

## Overview

Simple application to learn GraphQL and Next.js.

The application shows a list of books with a likes count.
When logged in through social login provider (currently only Facebook), books can be liked by the user.

Live demo at [bookstore-webpro.now.sh](https://bookstore-webpro.now.sh).

## Stack

- [Next.js](https://nextjs.org)
- [GraphQL](https://graphql.org)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [Express](https://expressjs.com)
- [Material UI](https://material-ui.com)

## Characteristics

- "Serverless"
  - Using [Now](https://zeit.co/now) (version 2)
  - Backed by [Graphcool](https://www.graph.cool)
- Material UI with Next.js (see [example](https://github.com/mui-org/material-ui/tree/master/examples/nextjs) and [Server Rendering](https://material-ui.com/guides/server-rendering/))
- Login using Facebook Login App (see [User Authentication with Facebook for React and Apollo](https://www.graph.cool/docs/tutorials/auth/authentication-with-facebook-for-react-and-apollo-yi9jeuwohl))
- Custom Express server (see [custom-server-express](https://github.com/zeit/next.js/blob/master/examples/custom-server-express/README.md) example)
- Local development over SSL using [devcert](https://github.com/davewasmer/devcert) (at [https://bookstore-webpro.now.dev:3000](https://bookstore-webpro.now.dev:3000))
- Environment variables exposed to client/server (see [Exposing configuration](https://github.com/zeit/next.js#exposing-configuration-to-the-server--client-side)) with [dotenv](https://github.com/motdotla/dotenv)/[dotenv-webpack](https://github.com/mrsteele/dotenv-webpack).
- Includes a [privacy policy page](https://bookstore-webpro.now.sh/privacy-policy) (regarding data collection from login providers).

## Prerequisites

- [Graphcool](https://www.graph.cool) account and the [Graphcool CLI](https://www.graph.cool/docs/reference/graphcool-cli/overview-zboghez5go).
- [Facebook Login App](https://developers.facebook.com/docs/facebook-login/web) (for web)
- [Now](https://zeit.co/now) (only for actual deployments)

## Installation

```
git clone https://github.com/webpro/bookstore
cd bookstore
```

Edit the `.env` file with your own keys.

```
npm install
graphcool deploy
npm run dev
```

## Deployment

```
now
```

## Todo/issues

[Issues](https://github.com/webpro/bookstore/issues)
