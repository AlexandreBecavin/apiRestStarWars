import express from 'express';
import People from '../model/People.js';
import authenticateToken from '../middleware/authMiddleware.js';

var peoples = express.Router();

peoples.route('/')
    .get(authenticateToken, async (req, res) => {
        try {
            const allPeoples = await People.find();
            const halPeoples = allPeoples.map((person) => person.toHAL());
            return res.status(200).json(halPeoples);
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    })
    .post(authenticateToken, async (req, res) => {
        try {
            const newPeople = new People({
                fields: { ...req.body },
                model: 'resources.people',
                pk: (new Date()).getTime(),
            });
            const insertedPeople = await newPeople.save();
            return res.status(201).json(insertedPeople);
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    });

peoples.route('/:id')
    .put(authenticateToken, async (req, res) => {
        try {
            const updatedFields = { ...req.body };
            const updatedPeople = await People.findOneAndUpdate({ pk: req.params.id }, { fields: updatedFields });

            if (!updatedPeople) {
                return res.status(404).json({ error: "People not found" });
            }

            return res.status(200).json({ message: "People updated successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    })
    .delete(authenticateToken, async function (req, res) {
        try {
            const deletedPeople = await People.deleteOne({ pk: req.params.id });

            if (deletedPeople.deletedCount === 0) {
                return res.status(404).json({ error: "People not found" });
            }

            return res.status(200).json({ message: "People deleted successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    })
    .get(authenticateToken, async (req, res) => {
        try {
            const people = await People.findOne({ pk: req.params.id });

            if (!people) {
                return res.status(404).json({ error: "People not found" });
            }

            return res.status(200).json(people.toHAL());
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    });

export {peoples};