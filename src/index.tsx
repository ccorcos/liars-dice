import React from "react"
import ReactDOM from "react-dom"
import { Game } from "./components/Game"
import { createGameDb, initGameDb } from "./GameDb"
import "./index.css"

// Build the environment.
const gameDb = createGameDb()
initGameDb(gameDb)

// For debugging from the Console.
;(window as any)["gameDb"] = gameDb

// Render the app.
const root = document.createElement("div")
document.body.appendChild(root)

ReactDOM.render(<Game gameDb={gameDb} />, root)

// What is a module?
// Lets introduce concepts one at a time...
//

/*

- "smart" vs "dumb" components?
	- a View vs a Component.


- keyboard
- commands
- focus

- command prompt
- modules, initialization.
- some other modoule that lets you list out different games
- fresh module with something else entirely.

*/
