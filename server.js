const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const inputFileService = require('./src/services/inputFile')

inputFileService.startFile(process.argv[2]);

app.listen(port, function () {
});

app.use(bodyParser.json());

require('./src/routes/base-routes')(app);

require('./src/prompt/prompt-base').consoleInterface();