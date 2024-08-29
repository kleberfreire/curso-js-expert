import RickAndMortyBRLAdapter from "./business/adpters/rickAndMortyBRLAdapter.js";
import RickAndMortyUSAAdapter from "./business/adpters/rickAndMortyUSAAdapter.js";

const main = async () => {
  // This is the main function that will call the adapters
  const data = [RickAndMortyBRLAdapter, RickAndMortyUSAAdapter].map(integration => {
    return integration.getCharacters();
  })

  console.log(data)

  const all = await Promise.allSettled(data);

  const success = all.filter(({ status }) => status === "fulfilled")
    .map(({ value }) => value)
    .reduce((acc, curr) => acc.concat(curr), []);
  const error = all.filter(({ status }) => status === "rejected")
    .map(({ reason }) => reason);

  console.table(success);
}

main();