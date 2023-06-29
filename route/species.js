import express from 'express';
import Species from '../model/Species.js';
import authenticateToken from '../middleware/authMiddleware.js';

var species = express.Router();

species.route('/')
    .get(authenticateToken, async (req, res) => {
        try {
            const species = await Species.find();
            const halSpecies = species.map((specie) => specie.toHAL());
            return res.status(200).json(halSpecies);
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    })
    .post(authenticateToken, async (req, res) => {
        try {
            const specie = new Species({
                fields: { ...req.body },
                model: 'resources.specie',
                pk: (new Date()).getTime(),
            });
            const insertedSpecie = await specie.save();
            return res.status(200).json(insertedSpecie);
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    });

species.route('/:id')
    .put(authenticateToken, async (req, res) => {
        try {
            const updatedFields = { ...req.body };
            const updatedSpecie = await Species.findOneAndUpdate({ pk: req.params.id }, { fields: updatedFields });

            if (!updatedSpecie) {
                return res.status(404).json({ error: "Specie not found" });
            }

            return res.status(200).json({ message: "Specie updated successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    })
    .delete(authenticateToken, async function(req, res) {
        try {
            const deletedSpecie = await Species.deleteOne({ pk: req.params.id });

            if (deletedSpecie.deletedCount === 0) {
                return res.status(404).json({ error: "Specie not found" });
            }

            return res.status(200).json({ message: "Specie deleted successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    })
    .get(authenticateToken, async (req, res) => {
        try {
            const specie = await Species.findOne({ pk: req.params.id });

            if (!specie) {
                return res.status(404).json({ error: "Specie not found" });
            }

            return res.status(200).json(specie.toHAL());
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    });

export {species};