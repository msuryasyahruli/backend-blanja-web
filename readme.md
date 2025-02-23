<br />
<p align="center">
  <div align="center">
    <img height="150" src="src/assets/shopping-bag-1.png" alt="blanja" border="0"/>
  </div>
  <h3 align="center">Blanja</h3>
  <p align="center">
    <a href="https://github.com/msuryasyahruli/backend-blanja-web"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://blanja-market-web.vercel.app/">View Demo</a>
    ·
    <a href="https://backend-blanja-v1.vercel.app/products">Api Demo</a>
  </p>
</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Installation](#installation)
  - [Documentation](#documentation)
  - [Related Project](#related-project)
- [Contributors](#contributors)
  - [Meet The Team Members](#meet-the-team-members)

# About The Project

Blanja is an E-commerce website project that aims to provide an easy and convenient online shopping experience for users in Indonesia. The site offers a wide range of products, including fashion, beauty, electronics, and food and beverages.

To use Blanja's services, users only need to create an account and enter their payment details. After that, users can browse products, add them to their shopping cart, and choose their preferred payment method.

With all the features and security provided, Blanja is expected to provide a safe, easy, and convenient online shopping experience for users across Indonesia.

## Built With

These are the libraries and service used for building this backend API

- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com)
- [PostgreSQL](https://www.postgresql.org)
- [Json Web Token](https://jwt.io)
- [Multer](https://github.com/expressjs/multer)

# Installation

1. Clone this repository

```sh
git clone https://github.com/msuryasyahruli/backend-blanja-web
```

2. Change directory to blanja-web

```sh
cd backend-blanja-web
```

3. Install all of the required modules

```sh
npm install
```

4. Create PostgreSQL database, query are provided in [query.sql](./query.sql)

5. Create and configure `.env` file in the root directory, example credentials are provided in [.env.example](./.env.example)

```txt
- Please note that this server requires Google Drive API credentials and Gmail service account
- Otherwise API endpoint with image upload and account register won't work properly
```

6. Run this command to run the server

```sh
npm run server
```

- Or run this command for running in development environment

```sh
npm run dev
```

- Run this command for debugging and finding errors

```sh
npm run lint
```

## Documentation

Documentation files are provided in the [docs](./docs) folder

- [Postman API colletion]()
- [PostgreSQL database query](./query.sql)

API endpoint list are also available as published postman documentation

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/27925772/2s9Y5ZwMy5)

## Related Project

:rocket: [`Backend Blanja`](https://github.com/msuryasyahruli/backend-blanja-web)

:rocket: [`Frontend Blanja`](https://github.com/msuryasyahruli/blanja-web)

:rocket: [`Demo Blanja`](https://blanja-market-web.vercel.app/)

Project link : [https://github.com/msuryasyahruli/backend-blanja-web](https://github.com/msuryasyahruli/backend-blanja-web)
