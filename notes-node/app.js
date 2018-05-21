const fs = require('fs');
const yargs = require('yargs');

const notes = require('./notes');
var titleOpt =  {
    describe: 'Title of note',
    demand: true,
    alias: 't'
}
const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOpt,
        body: {
            describe: "Body of note",
            demand: true,
            alias: 'b'
        }
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note',{
        title: titleOpt
    })
    .help()
    .argv;

var command = argv._[0];

if (command == 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note added');
        notes.logNote(note)
    } else {
        console.log("Not not added");
    }
} else if (command == 'list') {
    var allNotes = notes.getAll();
    console.log(`${allNotes.length} notes found.`);
    allNotes.forEach((element) => {
        notes.logNote(element);
    });
} else if (command == 'read') {
    var note = notes.getNote(argv.title)
    if (note) {
        notes.logNote(note);
    } else {
        console.log('Note not found.');
    }
} else if (command == 'remove') {
    var noteRemoved = notes.remove(argv.title);
    console.log(noteRemoved ? "Note was removed" : "Note not found");
} else {
    console.log('Command not recognized');
}
