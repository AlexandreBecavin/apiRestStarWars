import mongoose, { Schema } from "mongoose";

const PeopleSchema = new mongoose.Schema({
    fields: {
        name: {
            type: String,
        },
        height: {
            type: Number,
        },
        mass: {
            type: Number,
        },
        hair_color: {
            type: String,
        },
        skin_color: {
            type: String,
        },
        eye_color: {
            type: String,
        },
        birth_year: {
            type: String,
        },
        gender: {
            type: String,
        },
        homeworld: {
            type: Number,
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

PeopleSchema.methods.toHAL = function () {
    const hal = this.toObject();
    console.log(hal);
    hal._links = {
      self: {
        href: `http://localhost:3000/peoples/${hal.pk}`,
      },
      homeworld : {
        href: `http://localhost:3000/planets/${hal.fields.homeworld}`
      }
    };
  
    return hal;
  };
  

const People = mongoose.model("People", PeopleSchema);

export default People;