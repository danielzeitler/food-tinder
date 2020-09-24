# Foodswipe App Documentation

> An App build to enhance [React](https://reactjs.org/) and [NodeJS](https://nodejs.org/en/) knowledge. Its supposed to be a tinder like service, but for exploring different kinds of food around the globe using the [yelp fusion API](https://www.yelp.com/fusion).

Table of Contents:

- [Development Process](#development-process)
  - [Setting up your development environment](#setting-up-your-development-environment)
  - [Code Editor recommendation](#code-editor-recommendation)
  - [Development](#development)
  - [Running the project](#running-the-project)
  - [Login credentials](#login-credentials)

## Development Process

### Setting up your development environment

You'll need a recent version of [NodeJS](https://nodejs.org/en/). I used v11.4.0 for the development process. You can use [nvm](https://github.com/creationix/nvm) to easily install and manage different versions of node on your system.

```
node -v
# or
nvm current
```

#### Code Editor recommendation

For development [VS Code](https://code.visualstudio.com/) was used as a editor, with the following plugins:

##### Linting and Code Styling

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) to lint JavaScript

##### Code Formmatting

[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) to format the code. Activate ESLint integration in VS Code Settings:

```json
"prettier.eslintIntegration": true
```

### Development

> **NOTE**: If you want to check out the whole Application you need to make sure to clone the [Client](https://github.com/danielzeitler/react-tinder-clone) and the [Server](https://github.com/danielzeitler/react-tinder-clone-server).

Once node is installed, clone the repositories for [Client](https://github.com/danielzeitler/react-tinder-clone) and [Server](https://github.com/danielzeitler/react-tinder-clone-server) and run `npm install`.

```
git clone
cd INTO_PROJECT_FOLDER
npm i
```

### Running the project

> **NOTE**: Before running the project you need to make sure to import the MySQL Dump into [phpMyAdmin](https://www.phpmyadmin.net/). The Dump can be found in the Server Folder and then go to the SQL Folder. In the Server `config.js` you can connect adjust the Database Config to your needs.

Once the SQL Dump is imported you can start both the [Client](https://github.com/danielzeitler/react-tinder-clone) and the [Server](https://github.com/danielzeitler/react-tinder-clone-server).

[Client](https://github.com/danielzeitler/react-tinder-clone)

```
npm run start
# or shorthand alias
npm start

open http://localhost:3000
```

[Server](https://github.com/danielzeitler/react-tinder-clone-server)

```
node app.js
# or use nodemon
nodemon app.js

Server will run on http://localhost:5000 or the process.env.PORT
```

### Login Credentials

[phpMyAdmin](https://www.phpmyadmin.net/) Login. As stated earlier you can find the whole server setup in the Server folder. Just open the `config.js` and change data as needed.

```
Database: foodswipe_db
User: foodswipe_db
Password: foodswipe_pw
```

Test Users you can login with on the Client

```
User: dz@test.de
Password: 123456
```

```
User: cb@test.de
Password: 123456
```

```
User: we@test.de
Password: 123456
```

```
User: jc@test.de
Password: 123456
```
