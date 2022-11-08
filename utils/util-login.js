const pangolin = require("../models/pangolin");

exports.validateEmail = (email) => {
  const reg = /[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  return reg.test(email);
};

exports.validePassword = (password) => {
  const reg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  return reg.test(password);
};

exports.valideName = (name) => {
  const reg = /[A-Za-z0-9]{1}/;
  return reg.test(name);
};

exports.duplicateMail = async (email) => {
  const doesEmailExist = await pangolin.findOne({ email });
  if (doesEmailExist) {
    return false;
  } else return true;
};
