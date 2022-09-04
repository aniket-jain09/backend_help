const express = require('express');
const mongo = require('../../db/mongo/index');
const auth = require('../../middleware/auth')
const BadRequestError = require('../../errors/BadRequestError');
const DatabaseError = require('../../errors/DatabaseError');
const addReplySchema = require('../../utils/joi/addReply');
const NotAuthenticatedError = require('../../errors/NotAuthenticatedError');


module.exports = function notesRouter() {

    return new express.Router()
        .post('/', async (req, res)=>{
            const {uid, note} = req.body; 
            console.log(uid, note);
            await mongo.notes.addNote(uid, note);
            return res.status(201).send({
                msg: 'done'
            });
        })

        .get('/', async (req, res)=>{
            const uid = req.query.uid; 
            const notes = await mongo.notes.getNotesForUid(uid);
            
            return res.status(200).send({
                notes: notes
            })
        })

        .delete('/',  async (req,res)=>{
            const noteId = req.query.noteId; 
            await mongo.notes.deleteNote(noteId);
            return res.status(200).send({
                msg: 'done'
            })
        })
}