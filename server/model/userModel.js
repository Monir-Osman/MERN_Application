const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validatore = require("validator");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//static signup method
userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validatore.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validatore.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }
  const exists = await this.findOne({ email }); //<<this>> keyword is User
  if (exists) {
    throw Error("Email is already taken");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash });

  return user;
};

//static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All field must be filled");
  }
  const user = await this.findOne({ email }); //<<this>> keyword is User
  if (!user) {
    throw Error("Incorrect Email");
  }
  //compare the imported password with hashed password in database
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
