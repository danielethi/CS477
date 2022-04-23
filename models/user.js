const mongoose = require("mongoose");

class User {
  constructor(code, name, password, role) {
    (this.code = code),
      (this.name = name),
      (this.password = password),
      (this.role = role);
  }
  async getAll() {
    return await UserModel.find({});
  }
  async save() {
    //creaete user
    const result = await new UserModel(this);
    result.save();
  }
  async getUserByCode(code) {
    return await UserModel.findOne({ code: code });
  }
  async deleteByCode(code) {
    return await UserModel.deleteOne({ code: code });
  }
  async update() {
    const existUser = await this.getUserByCode();
    if (existUser) {
      await UserModel.updateOne({ code: code }, this);
      return true;
    } else {
      return false;
    }
  }
  async getByUserName(username) {
    return await UserModel.findOne({ username: username });
  }
}
module.exports = User;
