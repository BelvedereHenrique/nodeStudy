const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const argv = yargs.argv;
var command = argv._[0];

if (command == 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note added');
        console.log('---');
        console.log(`Title: ${note.title}`);
        console.log(`Body: ${note.body}`);
    }else{
        console.log("Not not added");
    }
} else if (command == 'list') {
    notes.getAll();
} else if (command == 'read') {
    var note = notes.getNote(argv.title)
    if (note) {
        console.log('Title:', note.title);
        console.log('Body:', note.body);
    }else{
        console.log('Note not found.')
    }
} else if (command == 'remove') {
    var noteRemoved = notes.remove(argv.title);
    console.log(noteRemoved ? "Note was removed":"Note not found");
} else {
    console.log('Command not recognized');
}
