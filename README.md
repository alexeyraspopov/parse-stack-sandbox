Run mongo

    docker run -d -p 27017:27017 -v ~/data:/data/db mongo

Run client

    cd client && yarn start

Run server

    cd server && node server.js
