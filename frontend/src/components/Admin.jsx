import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import VenueList from "./VenueList";
import VenueReducer from "../services/VenueReducer";
import VenueDataService from "../services/VenueDataService";

function Admin({ authControl }) {
  const navigate = useNavigate();
  const [deleteCtrl, setDeleteCtrl] = useState(false);

  useEffect(() => {
    if (!authControl) {
      navigate("/login");
    }
  }, [authControl, navigate]);

  const [venues, dispatchVenues] = React.useReducer(VenueReducer, {
    data: [],
    isLoading: true,
    isSuccess: false,
    isError: false,
    isDeleted: false,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await VenueDataService.listAllVenues();
        dispatchVenues({ type: "FETCH_SUCCESS", payload: response.data });
      } catch (error) {
        dispatchVenues({ type: "FETCH_ERROR" });
      }
    }

    setDeleteCtrl(false);
    fetchData();
  }, [deleteCtrl]);

  function handleClick(evt, id) {
    evt.preventDefault();

    if(evt.target.name === "Mekan Ekle"){
      navigate(`/admin/addupdate/venue/new`, { state: { action: "new" } });
    }

    if(evt.target.name === "Güncelle"){
      navigate(`/admin/addupdate/venue/${id}`, { state: { action: "update" } });
    }

    if(evt.target.name === "Sil"){
      VenueDataService.removeVenue(id).then((response) => {
        console.log("Başarılı");
        setDeleteCtrl(true);
      });
    }
  }

  return (
    <>
      <Header headerText="Yönetici" motto="Mekanlarınızı Yönetin!" />
      {venues.isError ? (
        <p>
          <strong>Bir şeyler ters gitti! ...</strong>
        </p>
      ) : venues.isLoading ? (
        <p>
          <strong>Mekanlar Yükleniyor ...</strong>
        </p>
      ) : (
        venues.isSuccess && (
          <div className="row">
            <VenueList
              venues={venues.data}
              admin={true}
              onClick={handleClick}
            />
          </div>
        )
      )}
    </>
  );
}

export default Admin;
