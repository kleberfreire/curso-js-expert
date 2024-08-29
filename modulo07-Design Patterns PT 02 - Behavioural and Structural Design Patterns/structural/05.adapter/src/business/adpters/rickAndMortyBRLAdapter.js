import RickAndMortyBRL from "../integrations/rickAndMortyBRL.js";

export default class RickAndMortyBRLAdapter {
  static async getCharacters() {
    const characters = await RickAndMortyBRL.getCharactersFromJSON();
    return characters;
  }
}