 
 const Chance= require('chance')
 const {Joke} = require('bee-jokes');
 const chance = new Chance();  
 const chalk= require('chalk')
 const fs=require('fs')
 const beeJokes = new Joke();
  const NOTES_FILE = 'notes.json';
 const addNote=()=>
  {
  
    const notes=loadNotes();
      let Joke, Name, Age, duplicateNote;
      do
      {
       Joke =beeJokes.getJoke({}).joke;
       Name= chance.name();
       Age =chance.age();
      duplicateNote=notes.find((note)=> note.Name.toLowerCase()=== Name.toLowerCase())
      } while(duplicateNote)
    
notes.push({
   Name,
   Age,
   Joke
});

      saveNotes(notes)
      console.log("new note added")
      }
     
    
    const saveNotes=(notes)=>
    {
      
      const dataJSON= JSON.stringify(notes)
      fs.writeFileSync(NOTES_FILE, dataJSON)
    }
      const loadNotes=()=>
    {
     try{
        const dataBuffer= fs.readFileSync(NOTES_FILE)
        const dataJSON= dataBuffer.toString()
        return JSON.parse(dataJSON)
     }
     catch(e)
     {
     return [];
     }
  }
  const removeNote=(Name)=>
   {
      const notes=loadNotes();
      const keepNotes= notes.filter((note)=>note.Name.toLowerCase()!== Name.toLowerCase())
      saveNotes( keepNotes)
      if( notes.length>keepNotes.length)
       {
       console.log(chalk.green('Note removed!'))
       }
      else{
        console.log(chalk.red(' NO Note removed!'))
       }
     
   }

   const listNotes=()=>
   {
     const notes=loadNotes();
     if(notes.length===0)
     {
      console.log(chalk.red(' No notes found!'))
     }
     else
     {
      console.log(chalk.green(' Your notes!'))
      for(let i=0;i<notes.length;i++)
      {
       console.log(notes[i]);
      }
    }
     
      
    
   }
   const readNote=(Name)=>
   {
     const notes=loadNotes();
    const matchingNote=notes.find((note)=> note.Name.toLowerCase()=== Name.toLowerCase())
     if(matchingNote)
     {
      console.log(`Name: ${chance.name()}, Age: ${chance.age()}, Joke: ${beeJokes.getJoke().joke}`)
     }
   
    else
    {
      console.log(chalk.red(' No Joke Found'))
    }
  }
  const pickOne=()=>
  {
      const notes=loadNotes();
    if(notes.length===0)
    {
      console.log(chalk.red(' No notes found!'))
    }
     
    console.log(chance.pickone(notes))

  }
 module.exports=
 {
   addNote:addNote,
   removeNote:removeNote,
   listNotes: listNotes,
   readNote: readNote,
   pickOne:pickOne
 }
