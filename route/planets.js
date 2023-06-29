import express from 'express';
import Planet from '../model/Planet.js';
import authenticateToken from '../middleware/authMiddleware.js';

var planets = express.Router();

planets.route('/')
    .get(authenticateToken, async (req, res) => {
        try {
            const allPlanets = await Planet.find();
            const halPlanets = allPlanets.map((planet) => planet.toHAL());
            return res.status(200).json(halPlanets);
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    })
    .post(authenticateToken, async (req, res) => {
        try {
            const newPlanet = new Planet({
                fields: { ...req.body },
                model: 'resources.planet',
                pk: (new Date()).getTime(),
            });
            const insertedPlanet = await newPlanet.save();
            return res.status(201).json(insertedPlanet);
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    });

planets.route('/:id')
    .put(authenticateToken, async (req, res) => {
        try {
            const updatedFields = { ...req.body };
            const updatedPlanet = await Planet.findOneAndUpdate({ pk: req.params.id }, { fields: updatedFields });

            if (!updatedPlanet) {
                return res.status(404).json({ error: "Planet not found" });
            }

            return res.status(200).json({ message: "Planet updated successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    })
    .delete(authenticateToken, async function(req, res) {
        try {
            const deletedPlanet = await Planet.deleteOne({ pk: req.params.id });

            if (deletedPlanet.deletedCount === 0) {
                return res.status(404).json({ error: "Planet not found" });
            }

            return res.status(200).json({ message: "Planet deleted successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    })
    .get(authenticateToken, async (req, res) => {
        try {
            const planet = await Planet.findOne({ pk: req.params.id });

            if (!planet) {
                return res.status(404).json({ error: "Planet not found" });
            }

            return res.status(200).json(planet.toHAL());
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    });

export {planets};