# Bacán Registration and Admin Tool

![Build and Deploy](https://github.com/YoSoyBacan/bacan-master-admin/workflows/Build%20and%20Deploy/badge.svg)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js 10.0+

### Installing

Clone the repository:

```
$ git clone git@github.com:YoSoyBacan/bacan-master-admin.git
```

Enter the project directory:

```
$ cd saleor-dashboard
```

Install NPM dependencies:

```
$ npm i
```

### Configuration

There are two environment variables available for configuration:

- `API_URI` (required) - URI of a running instance of Saleor GraphQL API.
  If you are running Saleor locally with the default settings, set `API_URI` to: `http://localhost:8000/graphql/`.

- `APP_MOUNT_URI` - URI at which the Dashboard app will be mounted.
  E.g. if you set `APP_MOUNT_URI` to `/dashboard/`, your app will be mounted at `http://localhost:9000/dashboard/`.

### Development

To start the development server run:

```
$ npm start
```

### Production

To build the application bundle run:

```
$ npm run build
```
