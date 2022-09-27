import cpx from "cpx"
import { build } from "estrella"
import * as fs from "fs"
import { Transform } from "stream"
import { path } from "./path"

const watch = process.argv.includes("--watch")
const cmd = watch ? "watch" : "copy"
cpx[cmd](path("src/app/index.html"), path("build/static"))
cpx[cmd](path("src/app/index.css"), path("build/static"))
cpx[cmd](path("src/app/icon.png"), path("build/static"))

cpx[cmd](path("src/app/service-worker.js"), path("build/static"), {
	transform: () => {
		return new Transform({
			transform(chunk, encoding, callback) {
				const text = chunk.toString()

				const transformedText = text
					.replace(
						"FILES",
						JSON.stringify(["index.html", "index.css", "icon.png", "index.js"])
					)
					.replace("VERSION", JSON.stringify(readVersion()))
				this.push(transformedText)
				callback()
			},
		})
	},
})

build({
	entry: path("src/app/index.tsx"),
	outfile: path("build/static/index.js"),
	bundle: true,
	sourcemap: watch ? "inline" : false,
	watch: watch,
	clear: false,
	// pass any options to esbuild here...
})

function readVersion() {
	return JSON.parse(fs.readFileSync(path("package.json"), "utf-8")).version
}
