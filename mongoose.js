const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/DressStore')
.then(() => {
    console.log("Succesfully connected to MongoDB");
})
.catch(()=>{
    console.log("Not able to connect to MongoDB");
});