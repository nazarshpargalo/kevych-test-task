FROM node:20-alpine
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including dev) for build
RUN npm install && \
    npm cache clean --force

# Copy source and build
COPY . .
RUN npm run build && \
    rm -rf src

# Remove dev dependencies after build
RUN npm prune --omit=dev

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "dist/main.js"]