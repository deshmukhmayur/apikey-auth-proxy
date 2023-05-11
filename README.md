# API Key Authentication Proxy

> This project is a work in progress. 

A reverse proxy that provides out-of-box API Key Authentication.

This project is inspired from [oauth2-proxy](https://github.com/oauth2-proxy/oauth2-proxy) which is a similar reverse proxy for oauth.

This reverse proxy service includes some built-in API endpoints for creating and managing API Keys (`/_api/apikeys`).

## Getting Started

1. Install dependencies

```bash
pnpm install
```

2. Start MongoDB service using `docker compose` (You can skip this if you have a local/external mongodb instance)

```bash
docker compose up -d mongodb
```

3. Start the dev server

```bash
pnpm dev
```

## TODO

- [ ] Add Dockerfile for the service, and publish the image to an image registry
- [ ] Make the `config.yaml` composable and dynamic to support environment variable substitution
- [ ] Write API Docs for the API Key endpoints
- [ ] Add usage docs for installation and docker method for sidecar containers

# License

This project is licensed under [Apache 2.0 license](./LICENSE).
