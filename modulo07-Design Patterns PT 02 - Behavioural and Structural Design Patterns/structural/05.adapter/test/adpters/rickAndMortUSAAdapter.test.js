import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import RickAndMortyUSA from "../../src/business/integrations/rickAndMortyUSA";
import RickAndMortyUSAAdapter from "../../src/business/adpters/rickAndMortyUSAAdapter";


describe("#RickAndMortyUSAAdapter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("#getCharacters should be an adapter for RickAndMortyUSA", async () => {
    const usaIntegration = jest.spyOn(
      RickAndMortyUSA,
      RickAndMortyUSA.getCharactersFromXML.name
    ).mockResolvedValue([]);
    const result = await RickAndMortyUSAAdapter.getCharacters();
    expect(result).toStrictEqual([]);
    expect(usaIntegration).toHaveBeenCalled();
  })
})
