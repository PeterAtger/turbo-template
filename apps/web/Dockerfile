FROM node:23-alpine AS base

# Builder stage
FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update
RUN apk add --no-cache libc6-compat

# Create app directory and set permissions
WORKDIR /app

RUN yarn global add turbo
COPY . .
RUN turbo prune web --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy the requirements.txt into the image
COPY --from=builder /app/out/json/ .
RUN yarn install

# Build the project
COPY --from=builder /app/out/full/ .

ARG NODE_ENV="production"
ARG BUILD_MODE="true"
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_YmFsYW5jZWQtd2Fob28tNy5jbGVyay5hY2NvdW50cy5kZXYk"

RUN yarn turbo build 

FROM base AS runner

# Create app directory and set permissions
WORKDIR /app

# Add non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    chown -R nextjs:nodejs /app

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

CMD node apps/web/server.js
