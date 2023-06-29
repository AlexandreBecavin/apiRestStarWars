import express from 'express';
import Starship from '../model/Starship.js';
import authenticateToken from '../middleware/authMiddleware.js';

var starships = express.Router();

starships.route('/')
    .get(authenticateToken, async (req, res) => {
        try {
            const starships = await Starship.find();
            const halStarships = starships.map((starship) => starship.toHAL());
            return res.status(200).json(halStarships);
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    })
    .post(authenticateToken, async (req, res) => {
        try {
            const starship = new Starship({
                fields: { ...req.body },
                model: 'resources.starship',
                pk: (new Date()).getTime(),
            });
            const insertedStarship = await starship.save();
            return res.status(200).json(starship);
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    });

starships.route('/:id')
    .put(authenticateToken, async (req, res) => {
        try {
            const updatedFields = { ...req.body };
            const updatedStarship = await Starship.findOneAndUpdate({ pk: req.params.id }, { fields: updatedFields });

            if (!updatedStarship) {
                return res.status(404).json({ error: "Starship not found" });
            }

            return res.status(200).json({ message: "Starship updated successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    })
    .delete(authenticateToken, async function(req, res) {
        try {
            const deletedStarship = await Starship.deleteOne({ pk: req.params.id });

            if (deletedStarship.deletedCount === 0) {
                return res.status(404).json({ error: "Starship not found" });
            }

            return res.status(200).json({ message: "Starship deleted successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    })
    .get(authenticateToken, async (req, res) => {
        try {
            const starship = await Starship.findOne({ pk: req.params.id });

            if (!starship) {
                return res.status(404).json({ error: "Starship not found" });
            }

            return res.status(200).json(starship.toHAL());
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    });

export {starships};