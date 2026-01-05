# Dockerfile for ASAFS Backend
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Generate Prisma client
RUN cd server && npx prisma generate

# Build the TypeScript project
RUN cd server && npm run build

EXPOSE 3000

# Start command
CMD ["sh", "-c", "cd server && npx prisma migrate deploy && npm start"]
