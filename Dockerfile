FROM node:26-trixie-slim AS base

WORKDIR /app

COPY package.json ./
RUN npm install -g "$(node -p "require('./package.json').packageManager.split('+')[0]")"

# Install all dependencies once so the build stage has everything it needs.
FROM base AS deps

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build the TypeScript app and copy static assets into dist/.
FROM deps AS build

COPY tsconfig.json ./
COPY src ./src
RUN pnpm build

# Create a production-only node_modules tree for the final runtime image.
FROM base AS prod-deps

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

# Final image: only the compiled app and runtime dependencies.
FROM base AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3333

# The app serves viewer assets from node_modules at runtime, so we copy them in.
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./

USER node

EXPOSE 3333

# Start the compiled server.
CMD ["node", "dist/server.js"]
