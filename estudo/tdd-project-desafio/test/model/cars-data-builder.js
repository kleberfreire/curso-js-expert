class CarsDataBuilder {
  constructor() {
    this.carsData = {
      id: "3b5c6d09-b8f2-4230-b6af-f30313e72d1c",
      name: "Golf",
      releaseYear: 2023,
      available: true,
      gasAvailable: true
    }
  }

  static aCars() {
    return new CarsDataBuilder()
  }
  

}

module.exports = CarsDataBuilder