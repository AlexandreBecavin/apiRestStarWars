import mongoose, { Schema } from "mongoose";

const StarshipSchema = new mongoose.Schema({
    fields: {
        MGLT: {
            type: String,
        },
        starship_class: {
            type: String,
        },
        hyperdrive_rating: {
            type: String,
        },
        pilots: [
            {
                type: Number,
                ref:"People"
            }
        ],
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

StarshipSchema.methods.toHAL = function () {
    const hal = this.toObject();
  
    hal._links = {
      self: {
        href: `http://localhost:3000/species/${hal.pk}`,
      },
    };

    hal.fields.pilots.forEach((pilotId, index) => {
        hal._links[`pilote${index}`] = {
            href: `http://localhost:3000/peoples/${pilotId}`
        };
    });
    
    return hal;
};

const Starship = mongoose.model("Starship", StarshipSchema);

export default Starship;