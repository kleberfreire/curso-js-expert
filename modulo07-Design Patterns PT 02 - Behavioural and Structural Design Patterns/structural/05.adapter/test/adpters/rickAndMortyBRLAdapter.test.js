import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import RickAndMortyBRL from "../../src/business/integrations/rickAndMortyBRL";
import RickAndMortyBRLAdapter from "../../src/business/adpters/rickAndMortyBRLAdapter";


describe("#RickAndMortyBRLAdapter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("#getCharacters should be an adapter for RickAndMortyBRL", async () => {
    const brlIntegration = jest.spyOn(
      RickAndMortyBRL,
      RickAndMortyBRL.getCharactersFromJSON.name
    ).mockResolvedValue([]);
    const result = await RickAndMortyBRLAdapter.getCharacters();
    expect(result).toStrictEqual([]);
    expect(brlIntegration).toHaveBeenCalled();
  })
})
