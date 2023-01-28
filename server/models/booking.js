const mongoose = require('mongoose');
// access feature from mongoose package = constructor function 
// points to a constructor function that can generate new schema objects (mongoose.schema)
const Schema = mongoose.Schema;

// instantiating NEW key word - 
// pass javascript object to constructor function to describe the structure of an event object
const eventSchema = new Schema({
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        date: {
            type: Date,
            required: true
        }

});

module.exports = mongoose.model('Event', eventSchema)

