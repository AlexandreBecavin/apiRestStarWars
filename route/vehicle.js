import express from 'express';
import Vehicle from '../model/Vehicle.js';
import authenticateToken from '../middleware/authMiddleware.js';

var vehicles = express.Router();

vehicles.route('/')
    .get(authenticateToken, async (req, res) => {
        try {
            const vehicles = await Vehicle.find();
            const halVehicles = vehicles.map((vehicle) => vehicle.toHAL());
            return res.status(200).json(halVehicles);
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    })
    .post(authenticateToken, async (req, res) => {
        try {
            const vehicle = new Vehicle({
                fields: { ...req.body },
                model: 'resources.vehicle',
                pk: (new Date()).getTime(),
            });
            const insertedVehicle = await vehicle.save();
            return res.status(201).json(insertedVehicle);
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    });

vehicles.route('/:id')
    .put(authenticateToken, async (req, res) => {
        try {
            const updatedFields = { ...req.body };
            const updatedVehicle = await Vehicle.findOneAndUpdate({ id: req.params.id }, { fields: updatedFields });

            if (!updatedVehicle) {
                return res.status(404).json({ error: "Vehicle not found" });
            }

            return res.status(200).json({ message: "Vehicle updated successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    })
    .delete(authenticateToken, async function(req, res) {
        try {
            const deletedVehicle = await Vehicle.deleteOne({ id: req.params.id });

            if (deletedVehicle.deletedCount === 0) {
                return res.status(404).json({ error: "Vehicle not found" });
            }

            return res.status(200).json({ message: "Vehicle deleted successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    })
    .get(authenticateToken, async (req, res) => {
        try {
            const vehicle = await Vehicle.findOne({ id: req.params.id });

            if (!vehicle) {
                return res.status(404).json({ error: "Vehicle not found" });
            }

            return res.status(200).json(vehicle.toHAL());
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    });


export {vehicles};