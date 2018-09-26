const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')

const port = process.env.PORT || 8000

const mysql = require('mysql')
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'register'
})

const dependencies = {
    connection
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'))

const people = require('./routes/people')

app.get('/', (req, res) => res.render('home'))
app.use('/people', people(dependencies))

//view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

connection.connect((err) => {
    if(err){
        console.log('database failure', err)
    }else{
        app.listen(port, () => console.log('server running on port '+port))
    }
})
