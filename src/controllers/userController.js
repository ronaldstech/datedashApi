const UserModel = require('../models/userModel');

const getUsers = async (req, res) =>{
    try{
        const users = await UserModel.getAll();
        res.json(users);
    }
    catch(e){
        res.status(500).json({
            message: e.message
        });
    }
}

const getUser = async (req, res) => {
    try{
        const id = req.params.id;
        const user = await UserModel.getById(id);

        if(!user){
            return res.status(404).json({
                message: "user not found"
            });
        }

        res.json(user);
    }
    catch(e){
        res.status(500).json({
            message: e.message
        });
    }
}

const createUser = async (req, res) => {
    try{
        const data = req.body;

        const result = await UserModel.create(data);

        res.status(201).json({
            message: "user created",
            id: result.insertId
        });
    }
    catch(e){
        res.status(500).json({
            message: e.message
        });
    }
}

const updateUser = async (req, res) => {
    try{
        const id = req.params.id;
        const data = req.body;

        await UserModel.update(id, data);

        res.json({
            message: "User updated"
        });
    }
    catch(e){
        res.status(500).json({
            message: e.message
        });
    }
}

const deleteUser = async (req, res) =>{
    try{
        const id = req.params.id;

        await UserModel.delete(id);

        res.json({
            message: "User deleted successfully"
        });
    }
    catch(e){
        res.status(500).json({
            message: e.message
        })
    }
}

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser }