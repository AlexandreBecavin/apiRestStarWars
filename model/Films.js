import mongoose, { Schema } from "mongoose";

const FilmsSchema = new mongoose.Schema({
    fields: {
        title: {
            type: String,
        },
        director: {
            type: String,
        },
        producer: {
            type: String,
        },
        opening_crawl: {
            type: String,
        },
        release_date: {
            type: Date,
        },
        episode_id: {
            type: Number,
        },
        starships: [
            {
                type: Number,
            }
        ],
        vehicles: [
            {
                type: Number,
            }
        ],
        planets: [
            {
                type: Number,
            }
        ],
        characters: [
            {
                type: Number,
            }
        ],
        species: [
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

FilmsSchema.methods.toHAL = function () {
    const hal = this.toObject();
    hal._links = {
      self: {
        href: `http://localhost:3000/films/${hal.pk}`,
      },
      starships : {
        href: `http://localhost:3000/starships/${hal.fields.starships}`
      },
      vehicles : {
        href: `http://localhost:3000/vehicles/${hal.fields.vehicles}`
      },
      planets : {
        href: `http://localhost:3000/planets/${hal.fields.planets}`
      },
      characters : {
        href: `http://localhost:3000/characters/${hal.fields.characters}`
      },
      species : {
        href: `http://localhost:3000/species/${hal.fields.species}`
      }
    };
  
    return hal;
  };

const Films = mongoose.model("Films", FilmsSchema);

export default Films;