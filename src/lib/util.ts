import express from "express"
import { exec } from "child_process"
import fs from "fs"
import { parse } from "csv-parse"
import cors from "cors"

const app = express()
const port = 8000

const _importDynamic = new Function("modulePath", "return import(modulePath)")

const readCSV = (file: string) =>
  new Promise((resolve, reject) => {
    const rows: any[] = []
    fs.createReadStream(file)
      .pipe(parse({ delimiter: ";", from_line: 1 }))
      .on("data", function (row) {
        rows.push(row)
      })
      .on("end", () => resolve(rows))
      .on("error", (error) => reject(error))
  })

export const startServer = async (file: string) => {
  const data = await readCSV(file)
  app.use(cors())
  const staticPath = `${__filename}/../../client/build/`
  app.use("/", express.static(staticPath))
  app.get("/api/data", (req: any, res: any) => {
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify(data))
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  const url = `http://localhost:${port}`
  const { default: open } = await _importDynamic("open")
  open(url)
}
