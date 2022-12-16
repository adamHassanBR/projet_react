
//import personnes model
const Personnes = require('../models/personnes');







//** Création des controller **//

//GET all personnes
const getAllPersonnes = (req, res) => {
    Personnes.find({}, (err, data)=>{
        if (err){
            return res.json({Error: err});
        }
        return res.json(data);
    })
};

//POST creat new personnes where mail is inconue

const newPersonnes = (req, res) => 
{
    //check if the Personnes mail already exists in db
    Personnes.findOne({ mail: req.body.mail }, (err, data) => 
    {

        //if Personnes not in db, add it
        if (!data) 
        {
            //create a new Personnes object using the Personnes model and req.body
            const newPersonnes = new Personnes
            (
                {
                    nom: req.body.nom,
                    prenom: req.body.prenom, // placeholder for now
                    mail: req.body.mail,
                    age: req.body.age,
                }
            )

            // save this object to database
            newPersonnes.save((err, data)=>
            {
                if(err) return res.json({Error: err});
                return res.json(data);
            })
        //if there's an error or the Personnes is in db, return a message         
        }
        else
        {
            if(err)
            {
                res.json(`Something went wrong, please try again. ${err}`);
            } 
            return res.json({message:"Personnes already exists"});
        }
    })    
};





//DELETE all personnes
const deleteAllPersonnes = (req, res) => {
    Personnes.deleteMany({}, err => {
        if(err) {
          return res.json({message: "Complete delete failed"});
        }
        return res.json({message: "Complete delete successful"});
    })
};

//GET 1 personnes

const getOnePersonnes = (req, res) => {
    let mail = req.params.mail; //get the Personnes mail

    //find the specific Personnes with that mail
    Personnes.findOne({mail:mail}, (err, data) => {
    if(err || !data) {
        return res.json({message: "Personnes doesn't exist."});
    }
    else return res.json(data); //return the Personnes object if found
    });
};




//POST '/personnes/:name'
const newAge = (req, res, next) => {
    res.json({message: "POST 1 personnes Age"});
};




//DELETE 1 Personnes
const deleteOnePersonnes = (req, res) => {
    let mail = req.params.mail; // get the mail of Personnes to delete

    Personnes.deleteOne({mail:mail}, (err, data) => {
    //if there's nothing to delete return a message
    if( data.deletedCount == 0) return res.json({message: "Personnes doesn't exist."});
    //else if there's an error, return the err message
    else if (err) return res.json(`Something went wrong, please try again. ${err}`);
    //else, return the success message
    else return res.json({message: "Personnes deleted."});
    });
};

//export controller functions
module.exports = {
    getAllPersonnes, 
    newPersonnes,
    deleteAllPersonnes,
    getOnePersonnes,
    newAge,
    deleteOnePersonnes
};


//****************************//