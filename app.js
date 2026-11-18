

const {Joke} = require('bee-jokes');
const Chance= require('chance')
const notes=require('./notes')
const yargs =require('yargs')
const beeJokes = new Joke();
const chance = new Chance();   

 yargs.command(
 {
    command :'add',
    describe:'add a new note',
     
  handler()
    {
      const joke =beeJokes.getJoke({});
      const chanceName= chance.name();
      const chanceAge =chance.age();
      notes.addNote(chanceName,chanceAge,joke);
     
    }
   }),

  yargs.command(
 {
    command :'remove',
    describe:'remove a new note',
     builder:
    {
      Name:
      {
         describe: 'not Name',
         demandOption:true,
         type: 'string'
      },
   },
     handler(argv)
    {
      notes.removeNote(argv.Name);
    },
 })


   yargs.command(
 {
    command :'list',
    describe:'list a note',
      handler()
     {
       notes.listNotes();
     },
 })
   yargs.command(
 {
    command :'read',
    describe:'read a new note',
    builder:
    {
      Name :
      {
         describe: 'not Name',
         demandOption:true,
         type: 'string'
      },
   },
    handler(argv)
    {
      notes.readNote(argv.Name); 
    },
   })
     yargs.command(
 {
    command :'pick',
    describe:'pick a note',
    handler()
    {
     notes.pickOne();
    }
 })
yargs.parse();

