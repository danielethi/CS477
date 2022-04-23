const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "dani-sami-maste123";

exports.addUser = async (req, res) => {
  const { code, name, password, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const ret = await new User(code, name, hashedPassword, role);

  ret.save();
};
exports.getUsers = async (req, res) => {
  const obj = new User();
  const ret = await obj.getAll();
  res.send(ret);
};
exports.getUserByCode = async (req, res) => {
  const obj = new User();
  const ret = await obj.getUserByCode(req.params.code);
  res.send(ret);
};
exports.deleteUserByCode = async (req, res) => {
  const obj2 = new User();
  const ret = await obj2.deleteByCode(req.params.code);

  res.send(ret);
};
exports.updateUserByCode = async (req, res) => {
  const { code, name, password } = req.body;
  const obj3 = new User(code, name, password);
  const ret = await obj3.update(code);
  res.send(obj3);
};

exports.login =async  (req, res) => {
  const { username, password } = req.body;
  const newuser = new User(username, password);
  const user=await newuser.getByUserName(username)
  // console.log(user)
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      const accessToken = jwt.sign({ username }, secretKey);
      res.send(accessToken );
    } else {
      res.send("wrong password");
    }
  } else {
       res.send('the user doesn not  exist')
  }
};

exports.authorize = (req, res, next) => {
  if (req.header.authoraization) {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Forbidden" });
      } else {
        req.user=user
        next();
      }
    });
  } else {
    res.status(401).json("please contact daniel,samuel and mastewal to login");
  }
};
exports.Adminauthorize=(req,res)=>{
  if(req.user.role==='Admin'){
      next()
  }else{
      res.send("you are not authorized")
  } 
}
