let host =  '127.0.0.1'
let password = ''
let user = "root"
let port  = 3306

const dbConf = {
  host,
  password,
  user,
  port,
  database:'database',
};

module.exports = { dbConf }
