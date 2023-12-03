const Service = require('./service')
const assert = require('assert')
const { createSandbox } = require('sinon');
const mocks = {
  alderann: require('../mocks/alderaan.json'),
  tatooine: require('../mocks/tatooine.json')
}

const BASE_URL_1 = 'https://swapi.dev/api/planets/1/'
const BASE_URL_2 = 'https://swapi.dev/api/planets/2/'
const BASE_URL_1_LOCAL = '../mocks/tatooine.json'
const BASE_URL_2_LOCAL = '../mocks/alderaan.json'

const simon = createSandbox();

  ; (async () => { 

    // {
    //   // vai para internet
    //   const service = new Service()
    //   const dados = await service.makeRequest(BASE_URL_1)
    //   console.log(JSON.stringify(dados))
    // }
    const service = new Service()
    const stub = simon.stub(
      service,
      service.makeRequest.name
    )
    stub.withArgs(BASE_URL_1)
      .resolves(mocks.tatooine)
   
    stub.withArgs(BASE_URL_2)
      .resolves(mocks.alderann)

    {
      const expected = {    
        name: 'Tatooine',
        surfaceWater: "1",
        appearedIn: 5
      }

      const result = await service.getPlanets(BASE_URL_1)

      assert.deepStrictEqual(result, expected)
  }
  {
      const expected = {    
        name: 'Alderaan',
        surfaceWater: "40",
        appearedIn: 2
      }

      const result = await service.getPlanets(BASE_URL_2)

      assert.deepStrictEqual(result, expected)
  }
 
  })()