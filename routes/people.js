const express = require('express')

const peopleController =  require('../controllers/people')

const peopleRouter = ({ connection }) => {
    const router = express.Router()
    
    router.get('/', peopleController.index.bind(null, connection))
    router.get('/delete/:id', peopleController.deleteOne.bind(null, connection))
    router.get('/create', peopleController.createPersonForm)
    router.post('/create', peopleController.createPerson.bind(null, connection))
    router.get('/update/:id', peopleController.updatePersonForm.bind(null, connection))
    router.post('/update/:id', peopleController.updatePerson.bind(null, connection))

    return router
}

module.exports = peopleRouter