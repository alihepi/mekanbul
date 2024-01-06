import React, { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import AdminButton from "./AdminButton";
import VenueDataService from "../services/VenueDataService";

function Register({ setAuthControl, setTokenCtrl }) {
  const navigate = useNavigate();

  const performClick = (evt) => {
      evt.preventDefault();

      const nameValue = evt.target.elements.authName.value;
      const emailValue = evt.target.elements.auth.value;
      const passwordValue = evt.target.elements.pswrd.value;

      if (!nameValue || !emailValue || !passwordValue) {
        alert("Değerler Boş Olamaz!!!");
        return;
      }

      const updatedVenueData = {
        name: nameValue,
        email: emailValue,
        password: passwordValue,
      };

      VenueDataService.signUp(updatedVenueData)
        .then((response) => {
          console.log("Kayıt Başarılı");
          alert("Kayıt Başarılı");
          setTokenCtrl(response.data.token);
          setAuthControl(true);
          navigate("/");
        })
        .catch((error) => {
          console.error("Başarısız ", error);
        });

  };

  return (
    <div className="container home-set">
      <Header
        headerText="Mekanbul"
        motto="Kayıt Ol"
      />
      <form className="form-horizontal home-set" onSubmit={performClick}>
        <div className="form-group">
          <label className="col-xs-10 col-sm-2 control-label">Ad Soyad:</label>
          <div className="col-xs-10 col-sm-8">
            <input
              className="form-control"
              name="authName"
              defaultValue={""}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="col-xs-10 col-sm-2 control-label">E-Posta:</label>
          <div className="col-xs-10 col-sm-8">
            <input
              className="form-control"
              name="auth"
              defaultValue={""}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="col-xs-10 col-sm-2 control-label">Sifre:</label>
          <div className="col-xs-10 col-sm-8">
            <input
              className="form-control"
              name="pswrd"
              defaultValue={""}
              type="password"
            />
          </div>
        </div>

        <div className="log-btn">
          <AdminButton name="Kayıt Ol" type="primary" />
        </div>
      </form>
    </div>
  );
}

export default Register;
