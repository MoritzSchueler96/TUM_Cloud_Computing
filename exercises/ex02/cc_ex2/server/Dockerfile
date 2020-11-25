# cloudcomputinggroup33
FROM node

LABEL author="moritz schueler <moritz-schueler96@gmx.de>"

RUN mkdir -p /src/app

WORKDIR /src/app

COPY package.json /src/app

RUN npm install

COPY . /src/app

EXPOSE 3000

CMD ["node", "server.js"]
