# Shared base image for all stages. We keep Node 22 to match the project setup.
FROM node:22-bookworm-slim AS base

WORKDIR /app

# Enable pnpm via Corepack so we can use the repo's existing pnpm lockfile.
RUN corepack enable

# Install all dependencies once so the build stage has everything it needs.
FROM base AS deps

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build the TypeScript app and copy static assets into dist/.
FROM deps AS build

COPY tsconfig.json ./
COPY src ./src
RUN pnpm build

# Create a production-only node_modules tree for the final runtime image.
FROM base AS prod-deps

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

# Final image: only the compiled app and runtime dependencies.
FROM node:22-bookworm-slim AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3333

# The app serves viewer assets from node_modules at runtime, so we copy them in.
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./

EXPOSE 3333

# Start the compiled server.
CMD ["node", "dist/server.js"]
