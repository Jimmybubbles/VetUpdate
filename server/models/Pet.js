const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const petSchema = new Schema({
    petName: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50,
        trim: true,
    },

    petAge: {
        type: Int,
        required: true,
    },

    petBreed: {
        type: String,
        required: true
    }

})

const Pet = model('Thought', petSchema);

module.exports = Pet 