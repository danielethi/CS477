const Room = require('../models/room')
exports.addRoom=async (req,res)=>{
       const {code,slots}=req.body
       const ret = await new Room(code,slots)
       if(code && slots){
            ret.save()
            res.send("saved")
       }else{
           res.send("please enter code and slots")
       }     
}
exports.getRooms=async (req,res)=>{
     const dummy = new Room()
     const allrooms=await (dummy.getAll())
     res.send(allrooms)
}
exports.getByCode=async (req,res)=>{
      const obj=new Room()
      const ret=await obj.getByCode(req.params.code)
      res.send(ret)
}
exports.deleteByCode=async (req,res)=>{
       const obj2=new Room()
       const ret=await obj2.deleteByCode(req.params.code)
       
       res.send(ret)
}
exports.updateRoomByCode= async (req,res)=>{
      const {code,slots}=req.body
      const obj3=new Room(code,slots)
      const ret=await obj3.update(code)
      
          res.send(obj3)         
}
exports.listBySlotsNumber=async (req,res)=>{
     const obj4=new Room()
    
     const num=req.param.number
     // const val=req.param.status
     const ret=await obj4.getBySlotNumber(num)
     res.send(ret)
   
}
exports.listBySlotsStatus=async (req,res)=>{
     const obj6=new Room()
     const stat=req.param.status
     // const val=req.param.status
     const ret=await obj6.getBySlotNStatus(stat)
     console.log(ret)
     res.send(ret)  
}
  


