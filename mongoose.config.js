const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/tttraining', (err, db)=>{
  if(err) throw err;
  console.log('Mongodb connected');
});

module.exports = mongoose;