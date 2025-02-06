const Hotel = require("../models/hotel.model");

// Function to updated hotel by Id
async function updateHotelById(hotelId, dataToUpdate){
    try{
      const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, dataToUpdate, { new: true });
      return updatedHotel; 
    } catch(error){
        console.error(error);
    }
}

module.exports = updateHotelById;