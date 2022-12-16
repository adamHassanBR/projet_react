

const mongoose = require("mongoose");

//** Shemas Personne **//
const PersonnesSchema = new mongoose.Schema({
    nom: {type:String, required:true},
    prenom: {type:String, required:true},
    mail: {type:String, required:true},
    age: {type:Number, required:true}
});

//*********************//

const Personnes = mongoose.model('personne', PersonnesSchema); 
module.exports = Personnes; 
