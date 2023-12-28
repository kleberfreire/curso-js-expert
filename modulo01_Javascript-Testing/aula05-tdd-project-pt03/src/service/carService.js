const BaseRepository = require('../repository/base/baseRepository')
const Tax = require('./../entities/tax')
const Transaction = require('./../entities/transaction')

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars })
    this.taxesBasedOnAge = Tax.taxesBasedOnAge
    this.currencyFormat = new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL',
    })
  }


  getRandomPositionFromArray(list) {
    const listLength = list.length

    const randomPosition = Math.floor(Math.random() * listLength)
    return Math.floor(Math.random() * listLength)
  }

  chooseRandomCar(carCategory) {
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds)
    const carId = carCategory.carIds[randomCarIndex]
    return carId
  }

  async getAvailableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory)
    const car = await this.carRepository.find(carId)
    return car
  }

  async calculateFinalPrice(customer, carCategory, numberOfDay) {
    const { age } = customer
    const { price } = carCategory
    
    const { then: tax } = this.taxesBasedOnAge.find(tax => age >= tax.from && age <= tax.to)

    const finalPrice = ((price * tax) * (numberOfDay))
    const formattedPrice = this.currencyFormat.format(finalPrice)
    
    return formattedPrice
  }

  async rent(costumer, carCategory, numberOfDays) {
    const car = await this.getAvailableCar(carCategory)
    const finalPrice = await this.calculateFinalPrice(costumer, carCategory, numberOfDays)
    
    const today = new Date()

    today.setDate(today.getDate() + numberOfDays)

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric"
    }
    const dueDate =  today.toLocaleDateString("pt-br", options)
   
    const transaction = new Transaction({
      amount: finalPrice,
      car,
      costumer,
      dueDate
    })

    return transaction
  }

}

module.exports = CarService