const express = require('express')
const mongoose = require('mongoose')

const db_name = 'book_store'
const db_url = `mongodb+srv://kwizeracaleb91:l0a0BWqmLeHXp26L@mernvercel.ezhejls.mongodb.net/?retryWrites=true&w=majority&appName=mernvercel`

const connect = function(cb) {
    mongoose.connect(db_url)
        .then((response) => {
            console.log('Database connected')
            cb()
        })
        .catch((error) => {
            console.log(error)
            cb()
        })
}

module.exports = {connect}
