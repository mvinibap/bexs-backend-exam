const inputFileService = require('../src/services/inputFile');
const routesService = require('../src/services/routes');

var fakeData = ['GRU,BRC,10', 'BRC,SCL,5', 'BRC,ORL,100', 'GRU,CDG,75', 'GRU,SCL,20', 'GRU,ORL,56', 'ORL,CDG,5', 'SCL,ORL,20'];

jest.mock('../src/services/inputFile');

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