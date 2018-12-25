const people = require('../models/people')
const moment = require('moment')

const index = async(connection, req, res) => {
    const results = await people.findAll(connection)
    res.render('people/index', { people: results}) 
}

const deleteOne = async(connection, req, res) => {
    await people.deleteOne(connection, req.params.id)
    res.redirect('/people')
}

const createPersonForm = (req, res) => {
    res.render('people/create')
}

const createPerson = async(connection, req, res) => {
    await people.create(connection, req.body)
    res.redirect('/people')
}

const updatePersonForm = async(connection, req, res) => {
    const results = await people.findById(connection, req.params.id)
    results.birth = moment(results.birth).format('YYYY-MM-DD')
    res.render('people/update', { person: results })
}

const updatePerson = async(connection, req, res) => {
    await people.update(connection, req.params.id, req.body)
    res.redirect('/people')
}

module.exports = {
    index, deleteOne, 
    createPersonForm, createPerson,
    updatePersonForm, updatePerson
}