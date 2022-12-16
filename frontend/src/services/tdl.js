import axios from "axios";


export const getTdl = async (id) => 
{
    const res = await axios.get(`http://localhost:3000/tdl/${id}`);
    return res.data;
};

export const getAllTdl = async () => 
{
    const res = await axios.get(`http://localhost:3000/tdl/`);
    return res.data;
};

export const newTdl = async (titre, echeance) => 
{
    let tdl = { titre: titre, echeance: echeance, statut: false };
    let res = await axios.put('http://localhost:3000/tdl', tdl);
    return res.data;
};

export const deleteOneTdl = async (id) => 
{
    const res = await axios.delete(`http://localhost:3000/tdl/${id}`);
    return res.data;
};

export const updateTdl = async (id, statut) => 
{
    let tdl = { statut: statut };
    const res = await axios.put(`http://localhost:3000/tdl/${id}`, tdl);
    return res.data;
};




