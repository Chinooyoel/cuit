const { expect } = require("@jest/globals");
const { validate_cuit } = require("./validation_cuit");

test('cuit with letters - cuit invalid', () => {
    expect(validate_cuit('aa2ccdddee')).toBe(false)
})
test('cuit with few numbers - cuit invalid', () => {
    expect(validate_cuit('2041247283')).toBe(false)
})
test('cuit with many numbers - cuit invalid', () => {
    expect(validate_cuit('204124728322232')).toBe(false)
})
test('cuit with signs - cuit invalid', () => {
    expect(validate_cuit('20-41247283-8')).toBe(false)
})
test('valid cuit but incorrect', () => {
    expect(validate_cuit('20412472832')).toBe(false)
})
test('valid cuit type number', () => {
    expect(validate_cuit(20412472838)).toBe(true)
})
test('incorrects cuit of companies', () => {
    const cuit_array = ['30579607553', '30502793174', '30678155461', '30285140221', '30500325327', '30497098282', '30643594470', '30751986266', '33638175859']
    cuit_array.forEach( cuit => {
        expect(validate_cuit(cuit)).toBe(false)
    })
})
test('corrects cuit of people', () => {
    const cuit_array = ['23269269294', '20380507332', '20353219708', '20393157063', '27393872735']

    cuit_array.forEach( cuit => {
        expect(validate_cuit(cuit)).toBe(true)
    })
})
test('corrects cuit of companies', () => {
    const cuit_array = ['30579607552', '30502793175', '30678155469', '30685140221', '30500525327', '30597098282', '30641594470', '30711986266', '33628175859']
    cuit_array.forEach( cuit => {
        expect(validate_cuit(cuit)).toBe(true)
    })
})