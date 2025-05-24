FROM debian:trixie
EXPOSE 3000/tcp

RUN apt update && apt install nodejs npm liquidsoap -y

RUN useradd -ms /bin/bash wappie
WORKDIR /home/wappie

COPY . .
RUN npm install

USER wappie
CMD ["node", "./app.js"]