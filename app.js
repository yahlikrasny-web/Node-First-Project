

const {Joke} = require('bee-jokes');
const Chance= require('chance')
const jokes=require('./notes')
const yargs =require('yargs')
const beeJokes = new Joke();
const chance = new Chance();   

 yargs.command(
 {
    command :'add',
    describe:'add a new note',
     
  handler()
    {
      jokes.addNote(); 
    }
   }),

  yargs.command(
 {
    command :'remove',
    describe:'remove a note',
     builder:
    {
      Name:
      {
         describe: ' Name of note',
         demandOption:true,
         type: 'string'
      },
   },
     handler(argv)
    {
      jokes.removeNote(argv.Name);
    },
 })


   yargs.command(
 {
    command :'list',
    describe:'list a note',
      handler()
     {
       jokes.listNotes();
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
         describe: 'Name of note',
         demandOption:true,
         type: 'string'
      },
   },
    handler(argv)
    {
      jokes.readNote(argv.Name); 
    },
   })
     yargs.command(
 {
    command :'pick',
    describe:'pick a note',
    handler()
    {
     jokes.pickOne();
    }
 })
yargs.parse();

