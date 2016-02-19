# crud-bears-mongo


- Create new directory (CRUD-BEARS-MONGO)
- NPM INIT in you new directory from the command line (creates package json in your newly created directory)

- Initialize a new repository in GIT hub
    - make a .gitignore folder in your directory
        - add node_modules/ to your .gitignore folder

- npm init creates your package.son folder, only create if there is nothing in your package.json
    - if you add dependencies to your package.json you should then run npm init  again

- npm install - -save (installs everything in the json package, it looks in the package and installs whatever it finds there)

- do your git commit
    - git add -A
        - git status
    - git commit -m “ .. comments .. "
        - git status
    - git push origin master

- sudo mongod  (this will start your server) (you should now open a new terminal window and leave the server terminal running)
    - if you close your terminal without killing mongo it will continue running until you stop it. (Harold posted it in Slack)
    - mongo is our database, mongoose is a orm utility that makes it easier to interact with our database

- npm install ejs - -save
    - express is in this install
    - express is a library (middleware)

- nodemon server.js
    - this points to our server to our server.js file

- create bears.js file

- Create bears schema (in bears.js)
    - schema is a blueprint for our