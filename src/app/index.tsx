navigator.serviceWorker
	.register("service-worker.js")
	.catch((err) => console.error(err))

import React, { useEffect, useMemo, useState } from "react"
import ReactDOM from "react-dom"

// Render the app.
const root = document.createElement("div")
document.body.appendChild(root)

function useLocalState<T>(value: T, name: string) {
	const initialState = useMemo(() => {
		let initialValue = value

		try {
			const result = localStorage.getItem(name)
			if (result !== null) {
				const parsed = JSON.parse(result)
				initialValue = parsed
			}
		} catch (error) {}

		return initialValue
	}, [])

	const [state, setState] = useState(initialState)

	useEffect(() => {
		localStorage.setItem(name, JSON.stringify(state))
	}, [state])

	return [state, setState] as const
}

function twoDec(n: number) {
	return Math.round(n * 100) / 100
}

function Calculator() {
	const [n, setN] = useLocalState(0, "counter")

	return (
		<>
			<h3>Liar's Dice Calculator</h3>

			<p>How many dice?</p>
			<div style={{ display: "flex", gap: 8 }}>
				<button onClick={() => setN(n - 1)}>{"-"}</button>
				<input
					type="number"
					value={n}
					onChange={(e) => {
						setN(Math.round(parseFloat(e.target.value)))
					}}
					style={{ width: "4em" }}
				/>
				<button onClick={() => setN(n + 1)}>{"+"}</button>
			</div>

			<p>Expected value of a given number:</p>
			<ul>
				<li>
					Ones are wild: <strong>{twoDec(n / 3)}</strong>
				</li>
				<li>
					Ones are not wild: <strong>{twoDec(n / 6)}</strong>
				</li>
			</ul>
		</>
	)
}

ReactDOM.render(<Calculator />, root)
