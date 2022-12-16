
//import tdl model
const Tdl = require('../models/tdl');


//** Création des controller **//



//POST creat new Tdl where mail is inconue

const newTdl = (req, res) => 
{
            //create a new Tdl object using the Tdl model and req.body
            const newTdl = new Tdl
            (
                {
                    titre: req.body.titre,
                    echeance: req.body.echeance, // placeholder for now
                    statut: req.body.statut,
                }
            )

            // save this object to database
            newTdl.save((err, data)=>
            {
                if(err) return res.json({Error: err});
                return res.json(data);
            })
};

//GET all Tdl
const getAllTdl = (req, res) =>
{
    Tdl.find({}, (err, data)=>
    {
        if (err)
        {
            return res.json({Error: err});
        }
        return res.json(data);
    })
};



//GET 1 Tdl

const getOneTdl = (req, res) =>
{
    let _id = req.params._id; //get the Tdl _id

    //find the specific Tdl with that _id
    Tdl.findOne({_id:_id}, (err, data) =>
    {
    if(err || !data) 
    {
        return res.json({message: "Tdl doesn't exist."});
    }
    else return res.json(data); //return the Tdl object if found
    });
};





//DELETE 1 Tdl
const deleteOneTdl = (req, res) =>
{
    let _id = req.params._id; // get the _id of Tdl to delete

    Tdl.deleteOne({_id:_id}, (err, data) =>
    {
    //if there's nothing to delete return a message
    if( data.deletedCount == 0) return res.json({message: "Tdl doesn't exist."});
    //else if there's an error, return the err message
    else if (err) return res.json(`Something went wrong, please try again. ${err}`);
    //else, return the success message
    else return res.json({message: "Tdl deleted."});
    });
};

const updateTdl = async (req, res) =>
{
    let _id = req.params._id;

    const filter = {_id: _id}

    const update = {
        statut: req.body.statut
    }
    console.log(update)

   let updated = await Tdl.findOneAndUpdate(filter, update, {new: true})
    return res.json(updated)
};




//export controller functions
module.exports = 
{
    getAllTdl, 
    newTdl,
    getOneTdl,
    deleteOneTdl,
    updateTdl
};


//****************************//