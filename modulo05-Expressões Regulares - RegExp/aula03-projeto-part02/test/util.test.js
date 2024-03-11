const { describe, it } = require('mocha')
const { expect } = require('chai')

const { InvalidRegexError, evaluateRegex } = require('./../src/util')
const TextProcessorFluentAPI = require('../src/textProcessorFluentAPI')


describe('Util', () => {
  it('#evaluateRegex should throw an error using an unsafe regex', () => {
    const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/

    /*
    // fica rodando em loop e quebra tudo!
    catastrophic backtracking!
    time \
    node --eval "/^([a-z|A-Z|0-9]+\s?)+$/.test('eaaae man como vai voce e como vai voce e como vai voce?') && console.log('legalzin')"
    */

    expect(() => evaluateRegex(unsafeRegex)).to.throw(InvalidRegexError, `This ${unsafeRegex} is unsafe dude!`)
  })
  it('#evaluateRegex should not throw an error using an unsafe regex', () => {
    const unsafeRegex = /^([a-z])$/
    expect(() => evaluateRegex(unsafeRegex)).to.not.throw
    expect(() => evaluateRegex(unsafeRegex)).to.be.ok
  })

  it('#divideTextInColumns', () => {
    const content = [
      [
        'Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ',
        'domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. '
      ].join('\n')
    ]

    const result = new TextProcessorFluentAPI(content)
      .divideTextInColumns()
      .build()

    const expected = [
      [
        'Xuxa da Silva',
        ' brasileira',
        ' casada',
        ' CPF 235.743.420-12',
        ' residente e \ndomiciliada a Rua dos bobos',
        ' zero',
        ' bairro Alphaville',
        ' São Paulo. '
      ]

    ]

    expect(result).to.be.deep.equal(expected)
  })
  it('#RemoveEmptyCharacters', () => {
    const content = [
      [
        'Xuxa da Silva',
        ' brasileira',
        ' casada',
        ' CPF 235.743.420-12',
        ' residente e \ndomiciliada a Rua dos bobos',
        ' zero',
        ' bairro Alphaville',
        ' São Paulo. '
      ]
    ]
    const result = new TextProcessorFluentAPI(content)
      .removeEmptyCharacters()
      .build()
    const regexRemoveSpaces = /^\s+|\s+$|\n/gm 

    const expected = [
      [
        'Xuxa da Silva',
        'brasileira',
        'casada',
        'CPF 235.743.420-12',
        'residente e domiciliada a Rua dos bobos',
        'zero',
        'bairro Alphaville',
        'São Paulo.'
      ]
    ]

    expect(result).to.be.deep.equal(expected)
  })
})