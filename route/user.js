import express from 'express';
import User from '../model/User.js';
import Vehicle from '../model/Vehicle.js';
import bcrypt from 'bcrypt';

var users = express.Router();

users.route('/')
    .get(async (req, res) => {
        const users = await User.find();
        return res.status(200).json(users);
    })
    .post(async (req, res) => {
        const password = await bcrypt.hash(req.body.password, 10);
        console.log(password);
        const user = new User({ ...req.body, password: password });
        console.log(user);
        const insertedUser = await user.save();
        return res.status(200).json(insertedUser);
    });
    
users.route('/:id')
    .put(function(req, res) {
        const vehicle = new User({ ...req.body });
        Vehicle.findByIdAndUpdate({id: req.params.id}, vehicle);
        return res.status(200).send('vehicle updated');
    })
    .delete(async function(req, res) {
        await User.deleteOne({id: req.params.id});
        return res.status(200).send('vehicle deleted');
    })
    .get(async (req, res) => {
        const vehicle = await User.findOne({id: req.params.id});
        return res.status(200).json(vehicle);
    });

export {users};