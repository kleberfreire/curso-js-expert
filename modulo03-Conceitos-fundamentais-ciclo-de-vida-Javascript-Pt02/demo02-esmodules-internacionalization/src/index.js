import database from './../database.json' assert { type: "json" }
import TerminalController from './terminalController.js'
import { save } from './repository.js'
import Person from './person.js'


const DEFAULT_LANG = "pt-BR"
const STOP_TERM = ":q"

// 04 carro,bike,barco 23000 2024-01-20 2024-01-23

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANG)
async function mainloop() {
  try {
    const answer = await terminalController.question("")
    if(answer === STOP_TERM) {
      terminalController.closeTerminal()
      console.log("Process finished")
      return
    }
    const person = Person.generateInstanceFromString(answer)
    // console.log('person', person.formatted(DEFAULT_LANG))
    terminalController.updateTable(person.formatted(DEFAULT_LANG))
    await save(person)
    return mainloop()
  } catch (e) {
    console.log('DEU RUIM**  ', e)
    return mainloop()
  }
}


await mainloop()

