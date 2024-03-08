# FROM node:21-alpine

# WORKDIR /app

# COPY package*.json .
# RUN npm install

# COPY next.config.js ./next.config.js
# COPY app app
# COPY components components
# COPY hooks hooks
# COPY lib lib
# COPY public public
# COPY utils utils
# COPY components.json .
# COPY middleware.js .

# RUN npm build

# CMD ["npm", "start"]

FROM node:alpine as BUILD_IMAGE
WORKDIR /app
COPY package*.json ./
# install dependencies
RUN npm install
COPY . .
# build
RUN npm run build
# remove dev dependencies
RUN npm prune --production
FROM node:alpine
WORKDIR /app
# copy from build image
COPY --from=BUILD_IMAGE /app/package.json ./package.json
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/.next ./.next
COPY --from=BUILD_IMAGE /app/public ./public
EXPOSE 3000
CMD ["npm", "start"]