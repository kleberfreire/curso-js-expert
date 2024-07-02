const rewiremock =  require('rewiremock/node')
const { deepStrictEqual } = require('assert')


// <poderia esta em outro arquivo>

  const dbData = [{ name: 'Joazinho' }, { name: 'Mariazinha' }]
  class MockDatabase {
    connect = () => { 
      return this 
    }
     find = async (query) => {
      return dbData
    }
  }

// </poderia esta em outro arquivo>
rewiremock(() => require('./../src/util/database')).with(MockDatabase)


;(async () => {
  {
    const expected = [{ name: 'JOAZINHO' }, { name: 'MARIAZINHA' }]
    rewiremock.enable()
    const UserFactory = require('../src/factory/ userFactory')
    const userFactory = await UserFactory.createInstance()
    const result = await userFactory.find()
    deepStrictEqual(result, expected)

    rewiremock.disable()
  }
  {
    const expected = [{ name: 'KLEBERFREIRE' }]

    const UserFactory = require('../src/factory/ userFactory')
    const userFactory = await UserFactory.createInstance()
    const result = await userFactory.find()
    deepStrictEqual(result, expected)

  }
})()
