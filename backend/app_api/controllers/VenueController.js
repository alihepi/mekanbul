var mongoose = require("mongoose");
var Venue = mongoose.model("venue");

const createResponse = function (res, status, content) {
  res.status(status).json(content);
};
var converter = (function () {
  var earthRadius = 6371; // km
  var radian2Kilometer = function (radian) {
    return parseFloat(radian * earthRadius);
  };
  var kilometer2Radian = function (distance) {
    return parseFloat(distance / earthRadius);
  };
  return {
    radian2Kilometer,
    kilometer2Radian,
  };
})();

const listAllVenues = async function (req, res) {
  try {
    const allVenues = await Venue.find({}); // Tüm mekanları bul
    const venueList = allVenues.map((venue) => {
      return {
        name: venue.name,
        address: venue.address,
        rating: venue.rating,
        foodanddrink: venue.foodanddrink,
        id: venue._id,
      };
    });
    createResponse(res, 200, venueList);
  } catch (error) {
    createResponse(res, 500, { status: "Sunucu hatası" });
  }
};


const listNearbyVenues = async function (req, res) {
  var lat = parseFloat(req.query.lat);
  var long = parseFloat(req.query.long);

  var point = {
    type: "Point",
    coordinates: [lat, long],
  };
  var geoOptions = {
    distanceField: "dis",
    spherical: true,
  };
  try {
    const result = await Venue.aggregate([
      {
        $geoNear: {
          near: point,
          ...geoOptions,
        },
      },
    ]);

    const venues = result.map((venue) => {
      return {
        distance: converter.kilometer2Radian(venue.dis),
        name: venue.name,
        address: venue.address,
        rating: venue.rating,
        foodanddrink: venue.foodanddrink,
        id: venue._id,
      };
    });
    createResponse(res, 200, venues);
  } catch (e) {
    createResponse(res, 404, {
      status: "Enlem ve boylam zorunlu ve sıfırdan farklı olmalı",
    });
  }
};

const addVenue = async function (req, res) {
  try {
    const { lat, long, hours } = req.body;

    const addHours = [
      {
        days: hours[0].days,
        open: hours[0].open,
        close: hours[0].close,
        isClosed: hours[0].isClosed,
      },
      {
        days: hours[1].days,
        open: hours[1].open,
        close: hours[1].close,
        isClosed: hours[1].isClosed,
      },
    ];

    const addObject = {
      ...req.body,
      coordinates: [lat, long],
      hours: addHours,
    };

    const saveVenue = await Venue.create(addObject);
    
    createResponse(res, 201, saveVenue);
  } catch (error) {
    createResponse(res, 400, { status: error.message });
  }
};

const getVenue = async function (req, res) {
  try {
    await Venue.findById(req.params.venueid)
      .exec()
      .then(function (venue) {
        createResponse(res, 200, venue);
      });
  } catch (error) {
    createResponse(res, 404, { status: "Böyle bir mekan yok" });
  }
};

const updateVenue = async function (req, res) {
  try {
    const venueId = req.params.venueid;
    const { lat, long, hours } = req.body;

    const updatedHours = [
      {
        days: hours[0].days,
        open: hours[0].open,
        close: hours[0].close,
        isClosed: hours[0].isClosed,
      },
      {
        days: hours[1].days,
        open: hours[1].open,
        close: hours[1].close,
        isClosed: hours[1].isClosed,
      },
    ];

    const updateObject = {
      $set: {
        ...req.body,
        coordinates: [lat, long],
        hours: updatedHours,
      },
    };

    const updatedVenue = await Venue.findByIdAndUpdate(venueId, updateObject, { new: true });

    createResponse(res, 200, updatedVenue);
  } catch (error) {
    createResponse(res, 400, { status: error });
  }
};

const deleteVenue = async function (req, res) {
  try {
    await Venue.findByIdAndDelete(req.params.venueid).then(function (venue) {
      createResponse(res, 200, { status: venue.name+" isimli mekan Silindi" });
    });
  } catch (error) {
    createResponse(res, 404, { status: "Böyle bir mekan yok!" });
  }
};

module.exports = {
  listNearbyVenues,
  listAllVenues,
  addVenue,
  updateVenue,
  getVenue,
  deleteVenue,
};
