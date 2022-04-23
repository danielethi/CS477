const express = require('express')
const router=express.Router()
const userController=require('../controller/user')


router.post('/login',userController.login)
router.get('',userController.getUsers)
router.post('/add',userController.addUser)
router.get('/:code',userController.getUserByCode)
router.delete('/:code',userController.deleteUserByCode)
router.put('/:code',userController.updateUserByCode)


module.exports=router