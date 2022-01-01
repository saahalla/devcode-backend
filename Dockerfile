FROM node:17.3-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# RUN apt-get update \
#   && apt-get install -y mysql-server \
#   && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN npm install 

RUN npm install -g pm2
# RUN npm install -g db-migrate
# If you are building your code for production
# RUN npm ci --only=production


# Bundle app source
COPY . .

# RUN service mysql restart

# RUN db-migrate up

EXPOSE 3030

CMD [ "npm", "start" ]