# Build stage
FROM node:22-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN rm -rf node_modules
RUN npm install --production

#Production stage
FROM node:22-alpine AS production

WORKDIR /app
COPY --from=Build /app/.next /app/.next
COPY --from=Build /app/node_modules /app/node_modules
COPY --from=Build /app/package.json /app/package.json
COPY --from=Build /app/public /app/public
EXPOSE 3000

CMD ["npm", "start"]
