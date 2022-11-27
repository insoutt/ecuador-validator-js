var assert = require('assert');
const validator = require('../src/index');

describe('Validate CI', function () {
    it('Invalid CI', function () {
        assert.equal(validator.ci(1), false);
        assert.equal(validator.ci('1'), false);
        assert.equal(validator.ci('abcedfcdsd'), false);
        assert.equal(validator.ci(-1709382786), false);
        assert.equal(validator.ci(4009382786), false);
        assert.equal(validator.ci(1000000000), false);
    });

    it('Valid CI', function () {
        assert.equal(validator.ci('3040017919'), true);
        assert.equal(validator.ci('0910985993'), true);
        assert.equal(validator.ci('1710034065'), true);
        assert.equal(validator.ci('3040017919'), true);
    });
});

describe('Validate RUC', function () {
    it('Invalid RUC', function () {
        assert.equal(validator.ruc(1), false);
        assert.equal(validator.ruc('1'), false);
        assert.equal(validator.ruc('abcedfcdsd'), false);
        assert.equal(validator.ruc(-1709382786), false);
        assert.equal(validator.ruc(4009382786), false);
        assert.equal(validator.ruc(1000000000000), false);
        assert.equal(validator.ruc('0013175071001'), false);
        assert.equal(validator.ruc('4713175071001'), false);

    });

    it('Valid RUC', function () {
        assert.equal(validator.ruc(1000000000001), true);
        assert.equal(validator.ruc('1000000000002'), true);
        assert.equal(validator.ruc('1713175071001'), true);
        assert.equal(validator.ruc('0791840299001'), true);
    });
});

describe('Validate Cellphone', function () {
    it('Invalid Cellphone', function () {
        assert.equal(validator.cellphone('984784667'), false);
        assert.equal(validator.cellphone('0884784667'), false);
        assert.equal(validator.cellphone('593084784667'), false);
    });

    it('Valid Cellphone', function () {
        assert.equal(validator.cellphone('0983484667'), true);
        assert.equal(validator.cellphone('593984784667', 'code'), true);
        assert.equal(validator.cellphone('+593984784667', 'code'), true);
    });
});

describe('Validate Placa Car', function () {
    it('Invalid Placa Car', function () {
        assert.equal(validator.placaCar('PBA038'), false);
        assert.equal(validator.placaCar('ABC938'), false);
        assert.equal(validator.placaCar('DAB0389'), false);
    });

    it('Valid Placa Car', function () {
        assert.equal(validator.placaCar('PBA0389'), true);
        assert.equal(validator.placaCar('LBA3987'), true);
        assert.equal(validator.placaCar('ABC1234'), true);
    });
});

describe('Validate Placa Moto', function () {
    it('Invalid Placa Moto', function () {
        assert.equal(validator.placaMoto('PBA038'), false);
        assert.equal(validator.placaMoto('ABC938'), false);
        assert.equal(validator.placaMoto('DA039E'), false);
        assert.equal(validator.placaMoto('AA0394'), false);
        assert.equal(validator.placaMoto('LA0394'), false);
        assert.equal(validator.placaMoto('A20394'), false);
        assert.equal(validator.placaMoto('A2039E'), false);
    });

    it('Valid Placa Moto', function () {
        assert.equal(validator.placaMoto('AA049E'), true);
        assert.equal(validator.placaMoto('LA049E'), true);
        assert.equal(validator.placaMoto('PA049E'), true);
    });
});

describe('Validate Telephone', function () {
    it('Invalid Telephone', function () {
        assert.equal(validator.telephone('28947980'), false);
        assert.equal(validator.telephone('98947980'), false);
        assert.equal(validator.telephone('02947980'), false);
        assert.equal(validator.telephone('2I947980'), false);
        assert.equal(validator.telephone('2895741', 'code'), false);
        assert.equal(validator.telephone('022895741', 'simple'), false);
        assert.equal(validator.telephone('+59322895741', 'simple'), false);
        assert.equal(validator.telephone('59322895741', 'simple'), false);
    });

    it('Valid Telephone', function () {
        assert.equal(validator.telephone('2895741'), true);
        assert.equal(validator.telephone('2895741', 'simple'), true);
        assert.equal(validator.telephone('022895741', 'code'), true);
        assert.equal(validator.telephone('+59322895741', 'international'), true);
        assert.equal(validator.telephone('59322895741', 'international'), true);
    });
});
