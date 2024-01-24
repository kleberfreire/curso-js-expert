import {describe, it, afterEach} from "mocha";
import {expect} from "chai";
import {readFile, writeFile} from 'fs/promises'

import Person from "../src/person.js";
import {save} from "../src/repository.js";

const { pathname: databaseFile } = new URL('./../test/mock/mock-database.json', import.meta.url)

describe ("Repository", () => {
  afterEach(async() => {
    await writeFile(databaseFile, JSON.stringify([]))
  })

  it("should create data a person and save in repository",async () => {
    const person = new Person({
      id: "10",
      kmTraveled:"20000", 
      from: '2020-01-01', 
      to:  '2020-02-01',
      vehicles:["Bike", "carro"]
    })

    await save(person, './../test/mock/mock-database.json')
    const file = JSON.parse((await readFile(databaseFile)))
    const expected = file.filter(f => f.id === person.id)[0]
    
    expect(person).to.be.deep.equal(expected)
  })
})