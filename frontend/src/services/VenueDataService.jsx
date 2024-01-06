import http from "./http-common";

class VenueDataService {
  
  /*Venue*/
  listAllVenues() {
    return http.get("/admin");
  }

  nearbyVenues(lat,long) {
    return http.get(`/venues?lat=${lat}&long=${long}`);
  }

  getVenue(id) {
    return http.get(`venues/${id}`);
  }

  addVenue(data) {
    return http.post("/admin/addupdate/venue/new", data);
  }

  updateVenue(id, data) {
    return http.put(`/venues/${id}`, data);
  }

  removeVenue(id) {
    return http.delete(`/venues/${id}`);
  }

  deleteAllVenues() {
    return http.delete("/venues");
  }

  /*Auth*/
  login(data){
    return http.post("/login",data);
  }

  signUp(data){
    return http.post("/signup",data);
  }

  /*Comment*/
  getComment(venueID, commentID) {
    return http.get(`/venues/${venueID}/comments/${commentID}`);
  }
  updateComment(venueID, commentID, data) {
    return http.put(`/venues/${venueID}/comments/${commentID}`, data);
  }

  addComment(venueID, data, token) {

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    return http.post(`/venues/${venueID}/comments`, data, config);
  }

  removeComment(venueID, commentID) {
    return http.delete(`/venues/${venueID}/comments/${commentID}`);
  }
}

export default new VenueDataService();
