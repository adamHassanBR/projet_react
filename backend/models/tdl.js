

const mongoose = require("mongoose");

//** Shemas tdl **//
const TdlSchema = new mongoose.Schema({
    titre: {type:String, required:true},
    echeance: {type:String, default: new Date()},
    statut: {type:Boolean, required:true}
});

//*********************//

const Tdl = mongoose.model('tdl', TdlSchema); 
module.exports = Tdl; 
