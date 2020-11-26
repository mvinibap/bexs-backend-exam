var file;
const fs = require('fs');
var data;

var startFile = async (fileName) => {
    file = fileName;
    await updateData();
};

var updateData = async () => {
    data = await readFile();
};

function getData() {
    return data;
}

var readFile = async () => {
    return await fs.readFileSync(file, 'utf-8').split('\n').filter(Boolean);
};

var addRoute = async (route) => {

    await fs.appendFile(file, `\r\n${route.toUpperCase()}`, function (err) {
        if (err) {
            console.log(err);
        } else {
            updateData();
        }
    });
};

module.exports = {
    startFile,
    addRoute,
    getData,
};
