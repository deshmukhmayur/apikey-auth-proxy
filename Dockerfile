## Deps and build stage
FROM registry.access.redhat.com/ubi9/nodejs-18 as builder

ADD --chown=1001:0 . $HOME/

RUN npm install --global pnpm

RUN pnpm install --silent && pnpm run build

## Final Stage
FROM registry.access.redhat.com/ubi9/nodejs-18-minimal as runner

LABEL org.opencontainers.image.source="https://github.com/deshmukhmayur/apikey-auth-proxy/"
LABEL org.opencontainers.image.description="A reverse proxy that provides out-of-box API Key Authentication."
LABEL org.opencontainers.image.licenses="Apache-2.0"

RUN npm install --global pnpm

COPY --from=builder $HOME/package.json $HOME/pnpm-lock.yaml ./

RUN pnpm install --prod

COPY --from=builder $HOME/dist $HOME/dist
COPY --from=builder $HOME/.env.example .

ENV PORT=8080
EXPOSE 8080

CMD [ "node", "dist/index.js" ]
