const {
    ObjectId
} = require('mongodb');
var config = require('../../../../config');
const {
    MDB_COLLECTION_NOTES
} = require('../../../../constants');
const MDB = require('../client').MDB;

const dbName = config.mongo.db;
const collection = MDB_COLLECTION_NOTES;

/**
 * It takes in a thoughtId, reply, userId, anonymous, and username and inserts a new reply into the
 * database.
 * @param thoughtId - the id of the thought that the reply is being added to
 * @param reply - the reply text
 * @param userId - ObjectId(userId),
 * @param [anonymous=false] - boolean
 * @param username - String
 * @returns The insertedId
 */

const addNote = async (uid, note) => {
    const objToBeInserted = {
        uid, note
    }

    try {

        const client = await MDB.getClient();
        console.log("hi")
        let db = client.db(dbName).collection(collection);
        console.log("hi")

        const res = await db.insertOne(objToBeInserted);

        return res.insertedId;

    } catch (e) {
        console.log(e);
        throw e;
    }

}

const deleteNote = async (noteId) => {

    try {

        const client = await MDB.getClient();
        let db = client.db(dbName).collection(collection);

        const res = await db.deleteOne({
            _id: ObjectId(noteId)
        });

        return res;

    } catch (e) {
        throw e;
    }

}


const getNotesForUid = async (id) => {

    try {

        const client = await MDB.getClient();
        let db = client.db(dbName).collection(collection);

        const notes = [];
        await db.find({
            uid: id
        }).forEach((note)=>{
            notes.push(note);
        })

        return notes;

    } catch (e) {
        throw e;
    }

}







module.exports = {
    addNote,
deleteNote,
getNotesForUid
}
