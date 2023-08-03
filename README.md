# Issue Transition Sankey Chart Generator

The goal of this web application is to visualize how the status of the
issues has changed from the start to the end of a sprint.

[![Netlify Status](https://api.netlify.com/api/v1/badges/24321a99-f976-4e83-9d15-0d140ce7453b/deploy-status)](https://app.netlify.com/sites/issue-transitions-sankey/deploys)

The application is automatically deployed via netlify once changes have been pushed to the `main` branch.
It is available at [issue-transitions-sankey.netlify.app](https://issue-transitions-sankey.netlify.app) as well
at [issue-transitions.smtz.dev](https://issue-transitions.smtz.dev).

## Project setup

At least node version 18 is required for building the application.

```bash
pnpm install
```

### Compiles and hot-reloads for development

```bash
pnpm run serve
```

The files located at [./testing](./testing/) can be used for development/demonstration purposes.

### Compiles and minifies for production

```bash
pnpm run build
```

### Lints and fixes files

```bash
pnpm run lint
pnpm run format
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
