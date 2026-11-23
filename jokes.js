const Chance = require("chance");
const { Joke } = require("bee-jokes");
const chance = new Chance();
const chalk = require("chalk");
const fs = require("fs");
const beeJokes = new Joke();
const JOKES_FILE = "jokes.json";

const addJoke = () => {
  const jokes = loadJokes();
  let joke, name, age, duplicateJoke;
  do {
    joke = beeJokes.getJoke({}).joke;
    name = chance.name();
    age = chance.age();
    duplicateJoke = jokes.find(
      (joke) => joke.name.toLowerCase() === name.toLowerCase(),
    );
  } while (duplicateJoke);

  jokes.push({
    name,
    age,
    joke,
  });

  saveJokes(jokes);
  console.log("new joke added");
};

const saveJokes = (jokes) => {
  const dataJSON = JSON.stringify(jokes);
  fs.writeFileSync(JOKES_FILE, dataJSON);
};
const loadJokes = () => {
  try {
    const dataBuffer = fs.readFileSync(JOKES_FILE);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};
const removeJoke = (name) => {
  const jokes = loadJokes();
  const keepJokes = jokes.filter(
    (joke) => joke.name.toLowerCase() !== name.toLowerCase(),
  );
  saveJokes(keepJokes);
  if (jokes.length > keepJokes.length) {
    console.log(chalk.green("Joke removed!"));
  } else {
    console.log(chalk.red(" NO Joke removed!"));
  }
};

const listJokes = () => {
  const jokes = loadJokes();
  if (jokes.length === 0) {
    console.log(chalk.red(" No jokes found!"));
  } else {
    console.log(chalk.green(" Your jokes!"));
    for (let i = 0; i < jokes.length; i++) {
      console.log(jokes[i]);
    }
  }
};
const readJoke = (name) => {
  const jokes = loadJokes();
  const matchingJoke = jokes.find(
    (joke) => joke.name.toLowerCase() === name.toLowerCase(),
  );
  if (matchingJoke) {
    console.log(
      `Name: ${matchingJoke.name}, Age: ${matchingJoke.age}, Joke: ${matchingJoke.joke}`,
    );
  } else {
    console.log(chalk.red(" No Joke Found"));
  }
};
const pickOne = () => {
  const jokes = loadJokes();
  if (jokes.length === 0) {
    console.log(chalk.red(" No jokes found!"));
  } else {
    console.log(chance.pickone(jokes));
  }
};
module.exports = {
  addJoke,
  removeJoke,
  listJokes,
  readJoke,
  pickOne
};
