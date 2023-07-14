const express = require('express')
const router = express.Router()
const authControllers = require('../../controllers/authControllers')
const authMiddleware = require('../../middleware/authentication')


router.post('/register', authControllers.register)

router.post('/register_arquitect', authControllers.register_arquitect)

router.post('/register_item', authControllers.register_item)

router.post('/edit_item', authControllers.edit_item)

router.post('/delete_item', authControllers.delete_item)

router.post('/login', authControllers.login)
 
router.post('/logout', authControllers.logout)

router.post('/refresh', authControllers.refresh)

router.get('/user', authMiddleware, authControllers.user)

router.get('/item', authControllers.item)

router.get('/item/:id', authControllers.itemById)

module.exports = router