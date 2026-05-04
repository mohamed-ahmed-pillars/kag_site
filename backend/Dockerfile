# Stage 1: Install and build
FROM oven/bun:1-alpine AS builder
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN NODE_ENV=production bun run build

# Stage 2: Production runner
FROM oven/bun:1-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/config ./config
COPY --from=builder /app/src ./src
COPY --from=builder /app/public ./public
COPY --from=builder /app/favicon.png ./favicon.png
COPY --from=builder /app/package.json ./package.json
EXPOSE 1337
CMD ["bun", "run", "start"]
