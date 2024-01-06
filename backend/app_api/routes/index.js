var express=require("express");
var router=express.Router();
var ctrlVenues=require("../controllers/VenueController");
var ctrlComments=require("../controllers/CommentController");

const ctrlAuth = require('../controllers/Auth');
const jwt = require('express-jwt');

const auth = jwt.expressjwt({
    secret:process.env.JWT_SECRET,
    userProperty: "payload",
    algorithms: ["sha1", "RS256", "HS256"]
});

router
.route("/venues")
.get(ctrlVenues.listNearbyVenues)
.post(ctrlVenues.addVenue);

router
.route("/venues/:venueid")
.get(ctrlVenues.getVenue)
.put(ctrlVenues.updateVenue)
.delete(ctrlVenues.deleteVenue);

router
.route("/venues/:venueid/comments")
.post(auth, ctrlComments.addComment);

router
.route("/venues/:venueid/comments/:commentid")
.get(ctrlComments.getComment)
.put(auth, ctrlComments.updateComment)
.delete(auth, ctrlComments.deleteComment);


/*Admin*/
router
.route("/admin")
.get(ctrlVenues.listAllVenues);

router
.route("/admin/addupdate/venue/:venueid")
.get(ctrlVenues.getVenue)
.put(ctrlVenues.updateVenue);

router
.route("/admin/addupdate/venue/new")
.post(ctrlVenues.addVenue);

/*JWT*/
router.post("/login", ctrlAuth.login);

/*Register*/
router.post("/signup", ctrlAuth.signUp);

module.exports=router;
