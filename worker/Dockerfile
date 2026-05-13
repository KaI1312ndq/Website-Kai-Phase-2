FROM node:22-bookworm-slim

# FFmpeg required for video composition
RUN apt-get update && apt-get install -y \
    ffmpeg \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY dist ./dist

ENV NODE_ENV=production

CMD ["node", "dist/index.js"]
