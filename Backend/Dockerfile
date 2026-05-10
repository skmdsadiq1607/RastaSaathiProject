# Stage 1: Builder
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

# Stage 2: Production
FROM node:20-alpine AS production

WORKDIR /usr/src/app

# Set node environment to production
ENV NODE_ENV production

# Copy necessary files from builder
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/src ./src
COPY --from=builder /usr/src/app/server.js ./server.js

# Remove development dependencies to save space (npm prune)
RUN npm prune --production

USER node

EXPOSE 3000

CMD ["node", "server.js"]
