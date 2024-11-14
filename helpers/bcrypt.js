const bcrypt = require("bcryptjs");

const hashing = (password) => bcrypt.hashSync(password, 10);
const compare = (password, dbPassword) => bcrypt.compareSync(password, dbPassword);

module.exports = { hashing, compare }