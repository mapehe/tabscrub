import _yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { startServer } from "./lib/util"
const yargs = _yargs(hideBin(process.argv))

yargs
  .command(
    "read <file>",
    "read a .csv file to the editor",
    (yargs) => {
      return yargs.positional("file", {
        describe: "the .csv file to read",
        required: true,
      })
    },
    (argv) => {
      startServer(argv.file as string)
    }
  )
  .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "Run with verbose logging",
  })
  .parse()
