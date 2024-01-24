import {writeFile, readFile} from 'fs/promises'
import { join } from 'path'

export const save = async (data, pathFile = './../database.json') => {
  const { pathname: databaseFile } = new URL(pathFile, import.meta.url)

  const currentData = JSON.parse((await readFile(databaseFile)))
  currentData.push(data)
  await writeFile(databaseFile, JSON.stringify(currentData))
}