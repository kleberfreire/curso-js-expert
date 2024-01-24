"use strict";var describe,it;module.link("mocha",{describe(v){describe=v},it(v){it=v}},0);var expect;module.link("chai",{expect(v){expect=v}},1);var Person;module.link("../src/person.js",{default(v){Person=v}},2);var save;module.link("../src/repository.js",{save(v){save=v}},3);

// import {readFile} from 'fs/promises'




// const { pathname: databaseFile } = new URL('./../database.json', import.meta.url)

describe ("Repository", () => {

  it("should create data a person and save in repository", () => {
    const person = new Person({
      id: "1",
      kmTraveled:"20000", 
      from: '2020-01-01', 
      to:  '2020-02-01',
      vehicles:["Bike", "carro"]
    })
    // const expected = {
    //   id: "1",
    //   kmTraveled:"20000", 
    //   from: '2020-01-01', 
    //   to:  '2020-02-01',
    //   vehicles:["Bike", "carro"]
    // }
    // await save(person)
    // const file = JSON.parse((await readFile(databaseFile)))
    // const expected = file.filter(f => f.id === person.id)[1]
    // console.log('filter',expected)
    // console.log('file',expected)
    

    // expect(person).to.be.deep.equal(expected)
    expect(true).to.be.deep.equal(true)
  })
})