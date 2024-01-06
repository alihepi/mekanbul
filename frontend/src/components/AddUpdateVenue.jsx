import React from "react";
import { useParams, useLocation } from "react-router-dom";
import AdminButton from "./AdminButton";
import Header from "./Header";
import VenueReducer from "../services/VenueReducer";
import VenueDataService from "../services/VenueDataService";
import { useNavigate } from "react-router-dom";

function AddUpdateVenue({ authControl }) {

  const navigate = useNavigate();

  if (authControl === false) {
    navigate("/login");
  }

  const { id } = useParams();
  let location = useLocation();

  const [venue, dispatchVenues] = React.useReducer(VenueReducer, {
    data: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  React.useEffect(() => {
    if (location.state && location.state.action === "update") {
      dispatchVenues({ type: "FETCH_INIT" });
      try {
        VenueDataService.getVenue(id).then((result) => {
          dispatchVenues({
            type: "FETCH_SUCCESS",
            payload: result.data,
          });
        });
      } catch {
        dispatchVenues({ type: "FETCH_FAILURE" });
      }
    }
  }, [location, id]);


  const performClick = (evt) => {
    evt.preventDefault();
    let [lat, long] = evt.target.elements.coordinates.value.split(",");
    let [open1, close1] = evt.target.elements.openclose1.value.split(",");
    let [open2, close2] = evt.target.elements.openclose2.value.split(",");

    if (open2.trim().toLowerCase() === "kapalı") {
      open2 = "Kapalı";
      close2 = "";
    }

    const day1 = evt.target.elements.day1.value;
    const day2 = evt.target.elements.day2.value;

    const updatedVenueData = {
      name: evt.target.elements.name.value,
      address: evt.target.elements.address.value,
      foodanddrink: evt.target.elements.foodanddrink.value,
      lat: lat,
      long: long,
      hours: [
        {
          days: day1,
          open: open1,
          close: close1,
          isClosed: false,
        },
        {
          days: day2,
          open: open2,
          close: close2,
          isClosed: false,
        },
      ],
    };

    if (location.state.action === "update") {
      VenueDataService.updateVenue(id, updatedVenueData)
        .then((response) => {
          console.log("Başarılı");
          navigate("/admin");
        })
        .catch((error) => {
          console.error("Başarısız ", error);
        });
    }

    if (location.state.action === "new") {
      VenueDataService.addVenue(updatedVenueData)
        .then((response) => {
          console.log("Başarılı");
          navigate("/admin");
        })
        .catch((error) => {
          console.error("Başarısız ", error);
        });
    }
  };


  return (
    <>
      {location.state.action == "new" ? (
        <Header headerText="Yönetici" motto="Yeni mekan ekleyin!" />
      ) : (venue.isSuccess ? (
        <Header
          headerText="Yönetici"
          motto={venue.data.name + " mekanını güncelleyin!"}
        />
      ) : (
        <Header headerText="Yönetici" />
      )
      )}

      <div className="col-xs-12 col-md-6">
        <form className="form-horizontal" id="addVenue" onSubmit={performClick}>
          <div className="form-group">
            <label className="col-xs-10 col-sm-2 control-label">Ad:</label>
            <div className="col-xs-12 col-sm-10">
              <input
                className="form-control"
                name="name"
                defaultValue={venue.data.name ? venue.data.name : ""}

              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-10 col-sm-2 control-label">Adres:</label>
            <div className="col-xs-12 col-sm-10">
              <input
                className="form-control"
                name="address"
                defaultValue={venue.data.address ? venue.data.address : ""}

              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-10 col-sm-2 control-label">
              İmkanlar:
            </label>
            <div className="col-xs-12 col-sm-10">
              <input
                className="form-control"
                name="foodanddrink"
                defaultValue={
                  venue.data.foodanddrink ? venue.data.foodanddrink : ""
                }

              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-10 col-sm-2 control-label">
              Enlem & Boylam:
            </label>
            <div className="col-xs-12 col-sm-10">
              <input
                className="form-control"
                name="coordinates"
                defaultValue={
                  venue.data.coordinates
                    ? venue.data.coordinates[0] +
                    "," +
                    venue.data.coordinates[1]
                    : ""
                }

              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-10 col-sm-2 control-label">
              Günler-1:
            </label>
            <div className="col-xs-12 col-sm-10">
              <input
                className="form-control"
                name="day1"
                defaultValue={venue.data.hours ? venue.data.hours[0].days : ""}

              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-10 col-sm-2 control-label">
              Açılış & Kapanış-1:
            </label>
            <div className="col-xs-12 col-sm-10">
              <input
                className="form-control"
                name="openclose1"
                defaultValue={
                  venue.data.hours
                    ? venue.data.hours[0].open + "," + venue.data.hours[0].close
                    : ""
                }

              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-10 col-sm-2 control-label">
              Günler-2:
            </label>
            <div className="col-xs-12 col-sm-10">
              <input
                className="form-control"
                name="day2"
                defaultValue={venue.data.hours ? venue.data.hours[1].days : ""}

              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-10 col-sm-2 control-label">
              Açılış & Kapanış-2:
            </label>
            <div className="col-xs-12 col-sm-10">
              <input
                className="form-control"
                name="openclose2"
                defaultValue={
                  venue.data.hours
                    ? venue.data.hours[1].open + "," + venue.data.hours[1].close
                    : ""
                }

              />
            </div>
          </div>
          {venue.data.name ? (
            <AdminButton name="Güncelle" type="primary" />
          ) : (
            <AdminButton name="Ekle" type="primary" />
          )}
        </form>
      </div>
    </>
  );
}

export default AddUpdateVenue;
