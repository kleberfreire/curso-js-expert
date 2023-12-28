const { describe, it, before, beforeEach, afterEach } = require('mocha')
const CarService = require('./../../src/service/carService')
const Transaction = require('./../../src/entities/transaction')

const { join } = require('path')
const { expect } = require('chai')
const sinon = require('sinon')

const carsDataBase = join(__dirname, './../../database', 'cars.json')


const mocks = {
  validCarCategory: require('../mocks/valid-carCategory.json'),
  validCar: require('../mocks/valid-cars.json'),
  validCustomer: require('../mocks/valid-customer.json')
}

describe('CarService Suite Tests', () => {
  let carService = {}
  let sandbox = {}
  before(() => {
    carService = new CarService({
      cars: carsDataBase
    })
  })

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should retrieve random position from an array', async () => {
    const data = [0, 1, 2, 3, 4] 
    const result = await carService.getRandomPositionFromArray(data)
    expect(result).to.be.lte(data.length).and.be.gte(0)
  })

  it('should choose the first id from a carIds in carCategory', async () => { 
    const carCategory = mocks.validCarCategory
    const carIdIndex = 0

    sandbox.stub(
      carService,
      carService.getRandomPositionFromArray.name
    ).returns(carIdIndex)

    const result = carService.chooseRandomCar(carCategory)
    const expected = carCategory.carIds[carIdIndex]
    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok
    expect(result).to.be.equal(expected)
  })

  it('given a carCategory it should return an available car', async() => { 
    const car = mocks.validCar
    const carCategory = Object.create(mocks.validCarCategory)
    carCategory.carIds = [car.id]

    sandbox.stub(
      carService.carRepository,
      carService.carRepository.find.name
    ).resolves(car)

    sandbox.spy(
      carService,
      carService.chooseRandomCar.name
    )

    const result = await carService.getAvailableCar(carCategory)
    const expected = car

    expect(carService.chooseRandomCar.calledOnce).to.be.ok
    expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok
    expect(result).to.be.deep.equal(expected)
  })

  it('given a carCategory, customer and numberOfDay it should calculate final amount in real', async () => { 
    const customer = Object.create(mocks.validCustomer)
    customer.age = 50

    const carCategory = Object.create(mocks.validCarCategory)
    carCategory.price = 37.6

    const numberOfDay = 5

    sandbox.stub(
      carService,
      "taxesBasedOnAge"
    ).get(() => [
            { from: 40, to: 50, then: 1.3},
        ])

    const expected = carService.currencyFormat.format(244.40)
    const result = await carService.calculateFinalPrice(customer, carCategory, numberOfDay) 
    expect(result).to.be.deep.equal(expected)
    
  })

  it('given a customer and a car category it should return a transaction receipt', async () => {
    const car = mocks.validCar
    const carCategory = {
      ...mocks.validCarCategory,
      price: 37.6,
      carIds: [car.id]
    }
    
    const costumer = Object.create(mocks.validCustomer)
    costumer.age = 20

    const numberOfDays = 5
    const dueDate = "10 de novembro de 2020"
    // const dueDate = "05/11/2020"

    const now = new Date(2020, 10, 5)
    sandbox.useFakeTimers(now.getTime())


    sandbox.stub(
      carService.carRepository,
      carService.carRepository.find.name
    ).resolves(car)

    const expectedAmount = carService.currencyFormat.format(206.80)
    const result = await carService.rent(
      costumer,
      carCategory,
      numberOfDays
    )

    const expected = new Transaction({
      costumer,
      car,
      dueDate,
      amount: expectedAmount
    })

    expect(result).to.be.deep.equal(expected)

    // const options = {
    //   year: "numeric",
    //   month: "long",
    //   day: "numeric"
    // }
    // console.log('today', today.toLocaleDateString("pt-br", options))
  })
})