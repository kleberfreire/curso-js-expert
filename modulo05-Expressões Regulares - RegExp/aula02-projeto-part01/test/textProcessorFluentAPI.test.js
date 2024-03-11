const { describe, it } = require('mocha')
const { expect } = require('chai')

const TextProcessorFluentAPI = require('./../src/textProcessorFluentAPI')

const mock = require('./mock/valid')

describe('TextProcessorApi', () => {
  it('should return the value as the constructor', () => {
    const result = new TextProcessorFluentAPI(mock).build()
    const expected = mock
    expect(result).to.be.deep.equal(expected)
  })
  it('should extract data from people', () => {
    const result = new TextProcessorFluentAPI(mock).extractPeopleData().build()
    const expected =  [
     [ 'Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ',
        'domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. '].join('\n'),
      ['Arya Robbin, belga, casado, CPF 884.112.200-52, residente e ',
        'domiciliada a Av. paulista, 1400, bairro Consolação, São Paulo. '].join('\n'),
      ['Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e ',
        'domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo.'].join('\n')
    ]

    expect(result).to.be.deep.equal(expected)
  })
})