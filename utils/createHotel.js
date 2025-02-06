const Hotel = require("../models/hotel.model");

// Function to create a hotel

async function createHotel(newHotel){
    try{
      const hotel = new Hotel(newHotel);
      const savedHotel = await hotel.save();
      return savedHotel;  
    } catch(error){
        console.error(error);
    }
}

module.exports = createHotel;