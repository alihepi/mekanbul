const mongoose = require("mongoose");
const Venue = mongoose.model("venue"); // Assuming "venue" is your model, adjust if needed
const User = mongoose.model("user");   // Assuming "user" is your model, adjust if needed

// Function to get the user based on the authentication token
const getUser = async (req, res, callback) => {
  try {
    if (req.auth && req.auth.email) {
      const user = await User.findOne({ email: req.auth.email });
      if (user) {
        callback(req, res, user.name);
      } else {
        createResponse(res, 404, { status: "Kullanıcı Bulunamadı" });
      }
    } else {
      createResponse(res, 400, { status: "Token Girilmedi" });
    }
  } catch (error) {
    createResponse(res, 500, { status: "Internal Server Error" });
  }
};

// Function to get a specific comment for a venue
const getComment = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.venueid).select("name comments").exec();

    if (!venue) {
      createResponse(res, 404, { status: "Venue not found" });
      return;
    }

    const comment = venue.comments.id(req.params.commentid);

    if (!comment) {
      createResponse(res, 404, { status: "Comment not found" });
    } else {
      const response = {
        venue: {
          name: venue.name,
          id: req.params.venueid,
        },
        comment: comment,
      };
      createResponse(res, 200, response);
    }
  } catch (error) {
    createResponse(res, 500, { status: "Internal Server Error" });
  }
};

// Function to calculate and update the overall rating for a venue
const updateRating = (venueid) => {
  Venue.findById(venueid)
    .select("rating comments")
    .exec()
    .then((venue) => {
      calculateLastRating(venue);
    })
    .catch((error) => {
      console.error("Error updating rating:", error);
    });
};

// Function to calculate the last rating for a venue
const calculateLastRating = (incomingVenue) => {
  if (incomingVenue.comments && incomingVenue.comments.length > 0) {
    const numComments = incomingVenue.comments.length;
    const sumRating = incomingVenue.comments.reduce((sum, comment) => sum + comment.rating, 0);
    const avgRating = Math.ceil(sumRating / numComments);
    incomingVenue.rating = avgRating;
    incomingVenue.save();
  }
};

// Function to create a new comment for a venue
const createComment = async (req, res, incomingVenue, author) => {
  try {
    incomingVenue.comments.push({
      author: author,
      rating: req.body.rating,
      text: req.body.text,
    });

    await incomingVenue.save();
    updateRating(incomingVenue._id);

    const comment = incomingVenue.comments[incomingVenue.comments.length - 1];
    createResponse(res, 201, comment);
  } catch (error) {
    createResponse(res, 500, { status: "Internal Server Error" });
  }
};

// Function to add a new comment to a venue
const addComment = async (req, res) => {
  try {
    await getUser(req, res, (req, res, userName) => {
      Venue.findById(req.params.venueid)
        .select("comments")
        .exec()
        .then((incomingVenue) => {
          createComment(req, res, incomingVenue, userName);
        })
        .catch((error) => {
          createResponse(res, 500, { status: "Internal Server Error" });
        });
    });
  } catch (error) {
    createResponse(res, 500, { status: "Internal Server Error" });
  }
};

// Function to delete a comment from a venue
const deleteComment = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.venueid).select("comments").exec();

    if (!venue) {
      createResponse(res, 404, { status: "Venue not found" });
      return;
    }

    const comment = venue.comments.id(req.params.commentid);

    if (!comment) {
      createResponse(res, 404, { status: "Comment not found" });
    } else {
      comment.remove();
      await venue.save();
      createResponse(res, 200, { status: `${comment.author}'s comment deleted` });
    }
  } catch (error) {
    createResponse(res, 500, { status: "Internal Server Error" });
  }
};

// Function to update a comment for a venue
const updateComment = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.venueid).select("comments").exec();

    if (!venue) {
      createResponse(res, 404, { status: "Venue not found" });
      return;
    }

    const comment = venue.comments.id(req.params.commentid);

    if (!comment) {
      createResponse(res, 404, { status: "Comment not found" });
    } else {
      comment.set(req.body);
      await venue.save();
      updateRating(venue._id);
      createResponse(res, 200, comment);
    }
  } catch (error) {
    createResponse(res, 500, { status: "Internal Server Error" });
  }
};

// Function to create a response with the given status and content
const createResponse = (res, status, content) => {
  res.status(status).json(content);
};

// Exporting the functions for use in other parts of the application
module.exports = {
  getComment,
  addComment,
  updateComment,
  deleteComment,
};