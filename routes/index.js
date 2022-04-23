const express = require('express')
const router = express.Router()
const roomController = require('../controller/room')
const userController=require('../controller/user')

// router.use(userController.authorize)
router.get('',roomController.getRooms)
router.get('/:code',roomController.getByCode)
router.delete('/:code',roomController.deleteByCode)
router.post('/add',roomController.addRoom)
router.put('/:code',roomController.updateRoomByCode)
router.get('/:number/:status',roomController.listBySlotsStatus)
router.get('/:number/:status',roomController.listBySlotsNumber)



module.exports=router