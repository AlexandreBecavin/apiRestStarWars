import express from 'express';
import Transport from '../model/Transport.js';
import authenticateToken from '../middleware/authMiddleware.js';

var transports = express.Router();

transports.route('/')
    .get(authenticateToken, async (req, res) => {
        try {
            const transports = await Transport.find();
            const halTransports = transports.map((transport) => transport.toHAL());
            return res.status(200).json(halTransports);
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    })
    .post(authenticateToken, async (req, res) => {
        try {
            const transport = new Transport({
                fields: { ...req.body },
                model: 'resources.transport',
                pk: (new Date()).getTime(),
            });
            const insertedTransport = await transport.save();
            return res.status(200).json(insertedTransport);
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    });

transports.route('/:id')
    .put(authenticateToken, async (req, res) => {
        try {
            const updatedFields = { ...req.body };
            const updatedTransport = await Transport.findOneAndUpdate({ pk: req.params.id }, { fields: updatedFields });

            if (!updatedTransport) {
                return res.status(404).json({ error: "Transport not found" });
            }

            return res.status(200).json({ message: "Transport updated successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    })
    .delete(authenticateToken, async function(req, res) {
        try {
            const deletedTransport = await Transport.deleteOne({ pk: req.params.id });

            if (deletedTransport.deletedCount === 0) {
                return res.status(404).json({ error: "Transport not found" });
            }

            return res.status(200).json({ message: "Transport deleted successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    })
    .get(authenticateToken, async (req, res) => {
        try {
            const transport = await Transport.findOne({ pk: req.params.id });

            if (!transport) {
                return res.status(404).json({ error: "Transport not found" });
            }

            return res.status(200).json(transport.toHAL());
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    });


export {transports};