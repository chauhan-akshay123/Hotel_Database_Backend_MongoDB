const Hotel = require("../models/hotel.model");

// Function to delete a hotel by ID
async function deleteHotelById(hotelId){
    try{
      const deletedHotel = await Hotel.findOneAndDelete(hotelId);
      return "Deleted Successfully"
    } catch(error){
        console.error(error);
    }
};

module.exports = deleteHotelById;