FROM node:10-alpine

# Make application home and node_modules dir
RUN mkdir -p /app/node_modules && chown -R node:node /app

# Copy application over
COPY --chown=node:node . /app

# Install node dependancies
USER node
WORKDIR /app
RUN npm install

# Expose application port
EXPOSE 3000

CMD ["node", "bin/www"]
