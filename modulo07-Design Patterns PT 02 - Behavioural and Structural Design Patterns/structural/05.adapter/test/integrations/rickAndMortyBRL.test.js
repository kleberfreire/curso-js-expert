import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import fs from "fs/promises";
import Character from "../../src/entities/character";
import RickAndMortyBRL from "../../src/business/integrations/rickAndMortyBRL";
import axios from "axios";

describe("Rick and Morty BRL", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('#getCharactersJson should return a list of characters Entity', async () =>{
    const response = JSON.parse(await fs.readFile('./test/mocks/characters.json'));
    const expected = response.results.map((char) => {
      return new Character(char);
    })

    jest.spyOn(axios, 'get').mockResolvedValue({ data: response });

    const result = await RickAndMortyBRL.getCharactersFromJSON();

    expect(result).toStrictEqual(expected);

  })
  test('#getCharactersJson should return an empty list if the API returns nothing',async () =>{
    const response = JSON.parse(await fs.readFile('./test/mocks/characters-empty.json'));
    const expected = response.results.map((char) => {
      return new Character(char);
    })

    jest.spyOn(axios, 'get').mockResolvedValue({ data: expected });

    const result = await RickAndMortyBRL.getCharactersFromJSON();

    expect(result).toStrictEqual(expected);

  })
})
