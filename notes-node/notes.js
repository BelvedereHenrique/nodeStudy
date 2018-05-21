const fs = require('fs');

const FILE_NAME = 'notes-data.json';

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync(FILE_NAME);
        return JSON.parse(notesString);

    } catch (error) {
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync(FILE_NAME, JSON.stringify(notes))
};

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };
    var duplicateNotes = notes.filter((note) => note.title === title);
    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var getAll = () => {
    return fetchNotes();
};

var getNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes=  notes.filter((note) => note.title === title);    
    return filteredNotes[0];
};

var logNote = (note)=>{
    console.log('---');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

var remove = (title) => {
    var notes = fetchNotes();
    var filteredNotes = fetchNotes().filter((note) => note.title !== title);
    saveNotes(filteredNotes);
    return notes.length !== filteredNotes.length;
};

module.exports = {
    addNote,
    getAll,
    getNote,
    remove,
    logNote
}