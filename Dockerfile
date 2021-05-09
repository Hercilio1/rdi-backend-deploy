FROM node:15-alpine AS builder

ARG DATABASE_URL
ARG API_KEY
ARG TEST

RUN echo $DATABASE_URL
RUN echo $API_KEY
RUN echo $TEST


# WORKDIR /app

# # Add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH
# ENV NODE_ENV=production
# ENV DATABASE_URL=$db_url
# ENV API_KEY=$api_key

# RUN apk update \
#     && apk add dumb-init

# COPY package.json /app/package.json
# COPY prisma /app/prisma/

# RUN npm install

# # Generate prisma
# RUN npx prisma generate
# # Sync the migrations
# RUN npx prisma migrate deploy

# Add app
COPY . /app

# Build the app
RUN npm run build

FROM node:15-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/build ./build

EXPOSE 4000

# Start the app
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "run", "start"]
