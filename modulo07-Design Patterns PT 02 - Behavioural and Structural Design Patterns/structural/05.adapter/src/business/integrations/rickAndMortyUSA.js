import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import Character from '../../entities/character.js';

const URL = 'https://gist.githubusercontent.com/ErickWendel/927970b8fa7117182413be100417607d/raw/d78adae11f5bdbff086827bf45f1bc649c339766/rick-and-morty-characters.xml?_gl=1*j496dc*_ga*MzMyMTYzMjUyLjE3MTg5MjczMTg.*_ga_37GXT4VGQK*MTcyMzYyOTc2OS4xNi4xLjE3MjM2Mjk4MTUuMC4wLjA.';
// const URL = ''

export default class RickAndMortyUSA {
  static async getCharactersFromXML() {
    const { data } = await axios.get(URL);
    const options = {
      explicitRoot: false,
      explicitArray: false,
    };
    const { results: { element: result = [] } } = await parseStringPromise(data, options);

    const defaultFormat = Array.isArray(result) ? result : [result];
  
    return defaultFormat.map((data) => new Character(data));
  }
}