const validGender = (gender) => {
  return ["male", "female", "other"].includes(gender) ? true : false;
};

module.exports = { validGender };
