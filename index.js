const app = require('./app')

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Code challenge listening on port ${port}`)
})