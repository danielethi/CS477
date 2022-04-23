const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  slots: [
    {
      number: { type: Number, required: true },
      status: { type: String, required: true },
      used_by: { type: Number },
    },
  ]
});
const MySchema = mongoose.model("room", roomSchema);
class Room {
  constructor(code, slots) {
    (this.code = code), (this.slots = slots);
  }
  async save() {
    const result =await new MySchema(this);
    result.save();
  }
  async getAll() {
    return await MySchema.find({});
  }
  async getByCode(code) {
    return await MySchema.findOne({ code: code });
  }
  async deleteByCode(code) {
    return await MySchema.deleteOne({ code: code });
  }
  async update(code) {
    const existRoom = await this.getByCode(code);
    if (existRoom) {
      await MySchema.updateOne({ code: code }, this);
      return true;
    } else {
      return false;
    }
  }
  async getBySlotNumber(number){
    return await MySchema.findOne({$elemMatch:{$number:number}})
  }
  async getBySlotStatus(status){
    return await MySchema.findOne({$elemMatch:{$status:status}})
  } 
}
module.exports = Room;
