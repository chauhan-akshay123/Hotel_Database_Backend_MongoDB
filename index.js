const express = require("express");
const app = express();
const { initializeDatabase } = require("./db/db.connect");
const createHotel = require("./utils/createHotel");
const { readAllHotels, readHotelByCategory, readHotelByName, readHotelByPhoneNumber, readHotelByRating } = require("./utils/readHotel");
const updateHotelById = require("./utils/updateHotel");
const deletedHotel = require("./utils/deleteHotel");
const deleteHotelById = require("./utils/deleteHotel");

app.use(express.json());

initializeDatabase();

// Endpoint to create hotel
app.post("/hotels", async (req, res) => {
    try{
     const savedHotel = await createHotel(req.body);
     res.status(200).json({ message: "Hotel Added successfully", savedHotel });    
    } catch(error){
        res.status(500).json({ message: "Error in creating a hotel", error: error.message });
    }
});

// Endpoint to read all Hotels
app.get("/hotels", async (req, res) => {
    try{
      const hotels = await readAllHotels();
      if(hotels.length === 0){
         return res.status(404).json({ message: "No hotels found." });
      }
      res.status(200).json(hotels);
    } catch(error){
        res.status(500).json({ message: "Error in fetching hotels", error: error.message });
    }
});

// Endpoint to read hotel by name
app.get("/hotels/:hotelName", async (req, res) => {
  try{
   const { hotelName } = req.params;
   const hotel = await readHotelByName(hotelName);
   if(!hotel || hotel.length === 0){
     return res.status(404).json({ message: "No hotel found." });
   }
   res.status(200).json(hotel);
  } catch(error){
     res.status(500).json({ message: "Error in reading hotel", error: error.message });
  }
});

// Endpoint to read a hotel by Phone Number
app.get("/hotels/directory/:phoneNumber", async (req, res) => {
    try{
     const { phoneNumber } = req.params;   
     const hotel = await readHotelByPhoneNumber(phoneNumber);
     if(!hotel || hotel.length === 0){
        return res.status(404).json({ message: "No hotel found." });
     }
     res.status(200).json(hotel);
    } catch(error){
       res.status(500).json({ message: "Error in reading hotel", error: error.message });
    }
});

// Endpoint to read hotel by rating
app.get("/hotels/rating/:hotelRating", async (req, res) => {
    try{
      const { hotelRating } = req.params;  
      const hotel = await readHotelByRating(hotelRating);
      if(!hotel || hotel.length === 0){
         return res.status(404).json({ message: "No hotel found." });
      } 
      res.status(200).json(hotel);
    } catch(error){
       res.status(500).json({ message: "Error in reading hotel", error: error.message }); 
    }
});

// Endpoint to read hotel by category
app.get("/hotels/category/:hotelCategory", async (req, res) => {
    try{
     const { hotelCategory } = req.params;
     const hotels = await readHotelByCategory(hotelCategory);
     if(hotels.length === 0){
        return res.status(404).json({ message: "No hotel found" });
     }
     res.status(200).json(hotels);
    } catch(error){
        res.status(500).json({ message: "Error in reading hotel", error: error.message });
    }
});

// Endpoint to update a hotel by ID
app.put("/hotels/update/:hotelId", async (req, res) => {
  try{
   const { hotelId } = req.params;
   const dataToUpdate = req.body;
   const updatedHotel = await updateHotelById(hotelId, dataToUpdate );
   if(!updatedHotel){
    return res.status(404).json({ message: "Hotel not found by this ID" });
   } 
   res.status(200).json({ message: "Hotel updated successfully", Hotel: updatedHotel });
  } catch(error){
     res.status(500).json({ message: "Error in updating hotel", error: error.message });
  }
});

// Endpoint to delete hotel by ID
app.delete("/hotels/delete/:hotelId", async (req, res) => {
    try{
     const { hotelId } = req.params;
     const deletedHotel = await deleteHotelById(hotelId);
     if(deletedHotel !== "Deleted Successfully"){
       return res.status(404).json({ message: "Hotel not found" });
     }
     res.status(200).json(deletedHotel);
    } catch(error){
        res.status(500).json({ message: "Error in deleting hotel", error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});