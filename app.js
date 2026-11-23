
const jokes = require("./jokes");
const yargs = require("yargs");

(yargs.command({
  command: "add",
  describe: "add a new joke",

  handler() {
    jokes.addJoke();
  },
}),
  yargs.command({
    command: "remove",
    describe: "remove a joke",
    builder: {
      name: {
        describe: " Name of joke",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      jokes.removeJoke(argv.name);
    },
  }));

yargs.command({
  command: "list",
  describe: "list a joke",
  handler() {
    jokes.listJokes();
  },
});
yargs.command({
  command: "read",
  describe: "read a new joke",
  builder: {
    name: {
      describe: "Name of joke",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    jokes.readJoke(argv.name);
  },
});
yargs.command({
  command: "pick",
  describe: "pick a joke",
  handler() {
    jokes.pickOne();
  },
});
yargs.parse();
