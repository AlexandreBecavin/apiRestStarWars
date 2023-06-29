import express from 'express';
import Films from '../model/Films.js';
import authenticateToken from '../middleware/authMiddleware.js';

var films = express.Router();

films.route('/')
    .get(authenticateToken, async (req, res) => {
        try {
            const films = await Films.find();
            const halFilms = films.map((film) => film.toHAL());
            return res.status(200).json(halFilms);
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    })
    .post(authenticateToken, async (req, res) => {
        try {
            const film = new Films({
                fields: { ...req.body },
                model: 'resources.film',
                pk: (new Date()).getTime(),
            });
            const insertedFilm = await film.save();
            return res.status(201).json(insertedFilm);
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    });

films.route('/:id')
    .put(authenticateToken, async (req, res) => {
        try {
            const updatedFields = { ...req.body };
            const updatedFilm = await Films.findOneAndUpdate({ pk: req.params.id }, { fields: updatedFields });

            if (!updatedFilm) {
                return res.status(404).json({ error: "Film not found" });
            }

            return res.status(200).json({ message: "Film updated successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    })
    .delete(authenticateToken, async function(req, res) {
            try {
            const deletedFilm = await Films.deleteOne({ pk: req.params.id });

            if (deletedFilm.deletedCount === 0) {
                return res.status(404).json({ error: "Film not found" });
            }

            return res.status(200).json({ message: "Film deleted successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    })
    .get(authenticateToken, async (req, res) => {
            try {
            const film = await Films.findOne({ pk: req.params.id });

            if (!film) {
                return res.status(404).json({ error: "Film not found" });
            }

            return res.status(200).json(film.toHAL());
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    });

export {films};