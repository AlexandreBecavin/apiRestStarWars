import mongoose, { Schema } from "mongoose";

const SpeciesSchema = new mongoose.Schema({
    fields: {
        name: {
            type: String,
        },
        classification: {
            type: String,
        },
        eye_colors: {
            type: String,
        },
        skin_colors: {
            type: String,
        },
        language: {
            type: String,
        },
        hair_colors: {
            type: String,
        },
        average_lifespan: {
            type: String,
        },
        average_height: {
            type: String,
        },
        homeworld: {
            type: Number,
        },
        people: [
            {
                type: Number,
            }
        ],
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


SpeciesSchema.methods.toHAL = function () {
    const hal = this.toObject();
  
    hal._links = {
      self: {
        href: `http://localhost:3000/species/${hal.pk}`,
      },
      homeworld : {
        href: `http://localhost:3000/planets/${hal.fields.homeworld}`
      },
    };

    hal.fields.people.forEach((personId, index) => {
        hal._links[`person${index}`] = {
            href: `http://localhost:3000/peoples/${personId}`
        };
    });
    
    return hal;
  };

const Species = mongoose.model("Species", SpeciesSchema);

export default Species;