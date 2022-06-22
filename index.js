const app = require('./app')
const config = require('./config')
const mongoose = require('mongoose')

mongoose.connect(config.db, (err, res) => {
    if (err) {
        console.log('Error to connect to the db')
        return
    }
    console.log('DataBase connected')

    app.listen(config.port, () => {
        console.log(`Code challenge listening on port ${config.port}`)
    })
})