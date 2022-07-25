const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/ventify', { useNewUrlParser: true, useUnifiedTopology: true }).then(response => {
    console.log('Successfully connected to the database')
}).catch(error => {
    console.log('Error connecting to the database:', error.message)
})