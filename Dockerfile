FROM node:lts-slim

WORKDIR /home/node/app

#RUN npm ci --only=production

EXPOSE 3000

COPY setup.sh /usr/local/bin/setup.sh
RUN chmod +x /usr/local/bin/setup.sh

ENTRYPOINT [ "/usr/local/bin/setup.sh" ]
