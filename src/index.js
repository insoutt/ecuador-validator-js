
const PLACA_CODES = [
    'A', 'B', 'C', 'E', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
];
const PHONE_CODES = [
    '022', '032', '042', '052', '062', '072',
]

exports.ci = function (ci) {
    if (typeof ci === 'number') {
        ci = ci.toString();
    }
    if (typeof ci !== 'string') {
        throw new Error('El número de cédula debe ser un string');
    }
    if (!isNumber(ci)) return false;
    if (ci.length !== 10) return false;

    const code = parseInt(ci.substring(0, 2));
    if (code <= 0 || (code >= 25 && code !== 30)) return false;

    const digits = ci.split('').map(Number);
    const verifier = digits.pop();

    const calculated = digits.reduce(
        (previous, current, index) => previous - (current * (2 - index % 2)) % 9 - (current === 9) * 9, 1000) % 10;
    return calculated === verifier;
}

exports.ruc = function (ruc) {
    if (typeof ruc === 'number') {
        ruc = ruc.toString();
    }
    if (typeof ruc !== 'string') {
        throw new Error('El RUC debe ser un string');
    }
    if (!isNumber(ruc)) return false;

    const code = parseInt(ruc.substring(0, 2));
    const lastDigit = parseInt(ruc.substring(12, 13));

    if (lastDigit <= 0 ) return false;
    if (code <= 0 || (code >= 25 && code !== 30)) return false;

    return ruc.length === 13;
}

exports.cellphone = function (cellphone, type) {

    type = type || 'simple';

    if (typeof cellphone === 'number') {
        cellphone = cellphone.toString();
    }
    if (typeof cellphone !== 'string') {
        throw new Error('El número de celular debe ser un string');
    }

    if (!isNumber(cellphone)) return false;

    if (type === 'simple') { // 09xxxxxxxx
        const start = cellphone.substring(0, 2);
        if (start !== '09') return false;
        return cellphone.length === 10;
    }
    if (type === 'code') { // 5939xxxxxxxxx | +5939xxxxxxxxx
        if (cellphone[0] === '+') {
            cellphone = cellphone.substring(1);
        }
        const code = cellphone.substring(0, 4);
        if (code !== '5939') return false;
        return cellphone.length === 12;
    }

    throw new Error('El tipo de celular no es válido, se aceptan los valores: simple, code, full');
}

exports.telephone = function (telephone, type = 'simple') {

    type = type || 'simple';

    if (typeof telephone === 'number') {
        telephone = telephone.toString();
    }
    if (typeof telephone !== 'string') {
        throw new Error('El número de teléfono debe ser un string');
    }

    if (!isNumber(telephone)) return false;

    if (type === 'simple') { // 2xxxxxxx
        const start = telephone[0];
        if (start !== '2') return false;
        return telephone.length === 7;
    }
    if (type === 'code') { // 022xxxxxxxxx
        const code = telephone.substring(0, 3);
        if (!PHONE_CODES.includes(code)) return false;
        return telephone.length === 9;
    }
    if (type === 'international') { // +59322xxxxxxxxx
        if (telephone[0] === '+') {
            telephone = telephone.substring(1);
        }
        const code = telephone.substring(0, 3);
        if (code !== '593') return false;
        const codeRegion = telephone.substring(3, 5);
        if (!PHONE_CODES.includes(0 + codeRegion)) return false;
        return telephone.length === 11;
    }

    throw new Error('El tipo de teléfono no es válido, se aceptan los valores: simple, code, international');
}


exports.placaCar = function (placa) {
    if (typeof placa !== 'string') {
        throw new Error('El número de placa debe ser un string');
    }

    if (placa.length !== 7) return false;

    placa = placa.toLocaleUpperCase();

    const code = placa[0];
    if (! PLACA_CODES.includes(code)) return false;

    return placa.search(/^[a-z]{3}[0-9]{4}$/i) !== -1;
}

exports.placaMoto = function (placa) {
    if (typeof placa !== 'string') {
        throw new Error('El número de placa debe ser un string');
    }

    if (placa.length !== 6) return false;

    placa = placa.toLocaleUpperCase();
    const code = placa[0];
    if (! PLACA_CODES.includes(code)) return false;

    return placa.search(/^[a-z]{2}[0-9]{3}[a-z]$/i) !== -1;
}

function isNumber(value) {
    return !isNaN(parseInt(value));
}

