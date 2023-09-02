const mongoose = require('mongoose');

const Messages = new mongoose.Schema({
    name: {type : Array , required : true},
    roomName: {type : String , required : true}
},{
    collection : "Messages",
    timestamps : true
});



module.exports = mongoose.model("Messages",Messages);
