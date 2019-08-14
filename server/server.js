let express = require('express');
let { ParseServer } = require('parse-server');
let ParseDashboard = require('parse-dashboard');

let app = express();
let appId = 'myAppId';
let masterKey = 'myMasterKey';
let serverURL = 'http://localhost:1337/api';

let api = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/parsetest',
  appId,
  masterKey,
  serverURL
});

let dashboard = new ParseDashboard({
  apps: [
    {
      appName: 'Parse Test App',
      appId,
      masterKey,
      serverURL,
    }
  ]
});

app.use('/api', api);
app.use('/dashboard', dashboard);

app.listen(1337, () => {
  console.log('Server started');
});
