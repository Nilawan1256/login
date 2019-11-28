var sequelize = require('sequelize');
var db={}

var sequelize  = new sequelize("testprojcet"/*DBname*/,"root"/*Username*/,"rootP@ssw0rd"/*Password*/,{
    host: 'localhost',
    dialect:"mysql",// DBMS ที่จะใช้
    // operatorsAliases: false, //Sequelize v6 ไม่สามารถใช้ได้

    pool:{
        max:5,
        min:0,
        acquire:30000,
        idel: 10000
    }
});

db.sequelize =sequelize

module.exports = db;

//////////////////////////////////////////////////////////////////////////////////////

// var mysql = require('mysql');

// var conn = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'test'
// });
// conn.connect(function(err){
// if(!err) {
//     console.log("Database is connected ... ^ w ^");
// } else {
//     console.log("Error connecting database ... - w - !!");
// }
// });

// module.exports = conn;