import mongoose from "mongoose";

const PlanetSchema = new mongoose.Schema({
    fields: {
        name: {
            type: String,
        },
        rotation_period: {
            type: String,
        },
        orbital_period: {
            type: String,
        },
        diameter: {
            type: String,
        },
        climate: {
            type: String,
        },
        gravity: {
            type: String,
        },
        terrain: {
            type: String,
        },
        surface_water: {
            type: String,
        },
        population: {
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

PlanetSchema.methods.toHAL = function () {
    const hal = this.toObject();
  
    hal._links = {
      self: {
        href: `http://localhost:3000/planets/${hal.pk}`,
      },
    };
    
    return hal;
  };

const Planet = mongoose.model("Planet", PlanetSchema);

export default Planet;