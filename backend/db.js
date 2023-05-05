const mongoose = require('mongoose');
const mongooseUri = "mongodb://localhost:27017/demo"
mongoose.connect(mongooseUri, () => {
    console.log("connected to mongoose database");
})