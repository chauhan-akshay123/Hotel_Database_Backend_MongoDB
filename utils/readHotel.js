const Hotel = require("../models/hotel.model");

// Function to fetch all hotels
async function readAllHotels(){
    try{
      const hotels = await Hotel.find();
      return hotels;  
    } catch(error){
        console.error(error);
    }
}

// Function to fetch hotel by its name
async function readHotelByName(name){
    try{
      const hotel = await Hotel.findOne({ name: { $regex: `^${name}$`, $options: "i" } }); // case insensitive
      return hotel;
    } catch(error){
        console.error(error);
    }
}

// Function to read hotel by Phone Number
async function readHotelByPhoneNumber(phoneNumber){
  try{
    const hotel = await Hotel.findOne({ phoneNumber: phoneNumber });
    return hotel;
  } catch(error){
     console.error(error);
  }  
}

// Function to read hotels by rating
async function readHotelByRating(rating){
    try{
      const hotels = await Hotel.find({ rating: rating });
      return hotels;  
    } catch(error){
        console.error(error);
    }
}

// Function to read hotels by category
async function readHotelByCategory(cat){
    try{
      const hotels = await Hotel.find({ category: { $regex: `^${cat}$`, $options: "i" } });
      return hotels;
    } catch(error){
        console.error(error);
    }
}

module.exports = { readAllHotels, readHotelByCategory, readHotelByName, readHotelByPhoneNumber, readHotelByRating }