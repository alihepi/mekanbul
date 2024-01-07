import React, { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import AdminButton from "./AdminButton";
import VenueDataService from "../services/VenueDataService";

function Login({ setAuthControl, setTokenCtrl, setAuthName, idCtrl }) {
  const navigate = useNavigate();

  const [regBtnName, setRegBtnName] = useState("");

  const performClick = (evt, btnName) => {
    if (btnName === "Giriş Yap") {
      evt.preventDefault();

      const emailValue = evt.target.elements.auth.value;
      const passwordValue = evt.target.elements.pswrd.value;

      if (!emailValue || !passwordValue) {
        alert("Değerler Boş Olamaz!!!");
        return;
      }

      const updatedVenueData = {
        email: emailValue,
        password: passwordValue,
      };

      VenueDataService.login(updatedVenueData)
        .then((response) => {
          console.log("Giriş Başarılı");
          setAuthName(response.data.name);
          setTokenCtrl(response.data.token);
          setAuthControl(true);
          
          if (idCtrl) {
            navigate(`/venue/${idCtrl}`);
          }else{
            navigate("/admin");
          }
          
        })
        .catch((error) => {
          console.error("Başarısız ", error);
        });
    }

    if (btnName === "Kayıt Ol") {
      navigate("/signup");
    }
  };

  return (
    <div className="container home-set">
      <Header
        headerText="Mekanbul"
        motto="Kullanıcı Girişi"
      />
      <form className="form-horizontal home-set" onSubmit={(evt) => performClick(evt, regBtnName)}>
        <div className="form-group">
          <label className="col-xs-10 col-sm-2 control-label">E-Posta:</label>
          <div className="col-xs-10 col-sm-8">
            <input
              className="form-control"
              name="auth"
              defaultValue={"alihappy@gmail.com"}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="col-xs-10 col-sm-2 control-label">Sifre:</label>
          <div className="col-xs-10 col-sm-8">
            <input
              className="form-control"
              name="pswrd"
              defaultValue={"12345"}
              type="password"
            />
          </div>
        </div>

        <div className="log-btn">
          <AdminButton
            name="Giriş Yap"
            type="primary"
            onClick={(evt) => {
              setRegBtnName("Giriş Yap");
            }}
          />
          <AdminButton
            name="Kayıt Ol"
            type="primary"
            onClick={(evt) => {
              setRegBtnName("Kayıt Ol");
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default Login;
