import mongoose, { Schema } from "mongoose";

const VehicleSchema = new mongoose.Schema({
    vehicle_class: {
        type: String,
    },
    pilots: [
        {
            type: Number,
        }
    ],     

});

VehicleSchema.methods.toHAL = function () {
    const hal = this.toObject();
  
    hal._links = {
      self: {
        href: `http://localhost:3000/vehicles/${hal.pk}`,
      },
    };

    hal.fields.pilots.forEach((personId, index) => {
        hal._links[`person${index}`] = {
            href: `http://localhost:3000/peoples/${personId}`
        };
    });
    
    return hal;
  };

const Vehicle = mongoose.model("Vehicle", VehicleSchema);

export default Vehicle;
