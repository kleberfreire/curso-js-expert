import RickAndMortyUSA from "../integrations/rickAndMortyUSA.js";

export default class RickAndMortyUSAAdapter {
  static async getCharacters() {
    const characters = await RickAndMortyUSA.getCharactersFromXML();
    return characters;
  }
}