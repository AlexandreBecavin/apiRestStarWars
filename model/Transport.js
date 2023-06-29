import mongoose from "mongoose";

const TransportSchema = new mongoose.Schema({
    fields: {
        name: {
            type: String,
        },
        cargo_capacity: {
            type: String,
        },
        consumables: {
            type: String,
        },
        passengers: {
            type: String,
        },
        max_atmosphering_speed: {
            type: String,
        },
        crew: {
            type: String,
        },
        length: {
            type: String,
        },
        model: {
            type: String,
        },
        cost_in_credits: {
            type: String,
        },
        manufacturer: {
            type: String,
        },
        created: {
            type: Date,
        },
        edited: {
            type: Date,
        },
    },
    model: {
        type: String
    },
    pk: {
        type: Number,
        unique: true,
        primary_key: true
    },
});

TransportSchema.methods.toHAL = function () {
    const hal = this.toObject();
  
    hal._links = {
      self: {
        href: `http://localhost:3000/transports/${hal.pk}`,
      },
    };
    
    return hal;
  };


const Transport = mongoose.model("Transport", TransportSchema);

export default Transport;