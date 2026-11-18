 
 const Chance= require('chance')
 const chance = new Chance();  
 const chalk= require('chalk')
 const fs=require('fs')
 const addNote=(Name,Age,Joke)=>
  {
    const notes=loadNotes();
    const duplicateNote=notes.find((note)=> note.Name=== Name)
    if(!duplicateNote)
      {
      notes.push({
       Name:Name,
       Age:Age,
       Joke:Joke
     })
     
      savenotes(notes)
      console.log("new note added")
      }
     else{
      console.log("note title taken")
      }
    }
    const savenotes=(notes)=>
    {
      const dataJSON= JSON.stringify(notes)
      fs.writeFileSync('notes.json',dataJSON)
    }
      const loadNotes=()=>
    {
     try{
        const dataBuffer= fs.readFileSync('notes.json')
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
      const duplicateNotes= notes.filter((note)=>note.Name!== Name)
      savenotes( duplicateNotes)
      if( notes.length>duplicateNotes.length)
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
     console.log(chalk.green(' your notes!'))
     for(let i=0;i<notes.length;i++)
     {
      console.log(notes[i]);
     }
      
     

   }
   const readNote=(Name)=>
   {
    notes=loadNotes();
    const duplicateNote=notes.find((note)=> note.Name=== Name)
     if(duplicateNote)
     {
      console.log("Name:"+duplicateNote.Name+" Age:"+duplicateNote.Age+" Joke:"+duplicateNote.Joke)
     }
   
    else
    {
      console.log(chalk.red(' Error'))
    }
  }
  const pickOne=()=>
  {
    notes=loadNotes();
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
