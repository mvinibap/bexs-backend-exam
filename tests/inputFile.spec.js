const fileName = 'input-file.csv';
const inputFileService = require('../src/services/inputFile');
const routesService = require('../src/services/routes');

const newRoute = 'SP-RP-100'

var fakeData = ['GRU,BRC,10', 'BRC,SCL,5', 'BRC,ORL,100', 'GRU,CDG,75', 'GRU,SCL,20', 'GRU,ORL,56', 'ORL,CDG,5', 'SCL,ORL,20'];

jest.mock('../src/services/inputFile');

describe('Services inputFile', () => {

    beforeAll(() => {
        inputFileService.getData.mockReturnValue(fakeData);
    });

    test(`It should load file ${fileName}`, async () => {

        await inputFileService.startFile(fileName);

        let data = await inputFileService.getData();
        let expectedData = ['GRU,BRC,10', 'BRC,SCL,5', 'BRC,ORL,100', 'GRU,CDG,75', 'GRU,SCL,20', 'GRU,ORL,56', 'ORL,CDG,5', 'SCL,ORL,20'];

        expect(expectedData).toEqual(data);
    });

    test(`It should add route to file ${fileName}`, async () => {

        inputFileService.addRoute.mockReturnValue(fakeData.push(newRoute));
        let data = await inputFileService.getData();
        let expectedData = ['GRU,BRC,10', 'BRC,SCL,5', 'BRC,ORL,100', 'GRU,CDG,75', 'GRU,SCL,20', 'GRU,ORL,56', 'ORL,CDG,5', 'SCL,ORL,20', newRoute];
        expect(expectedData).toEqual(data);
    });
});

describe('Services routes', () => {

    beforeAll(() => {
        inputFileService.getData.mockReturnValue(fakeData);
    });

    test('It should find best route', async () => {

        let origin = 'GRU';
        let target = 'ORL';

        var data = await routesService.findBestRoute(origin, target);

        let expectedData = {
            path: ['GRU', 'BRC', 'SCL', 'ORL'],
            price: 35
        };

        expect(expectedData).toEqual(data);
    });
});