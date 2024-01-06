import "./App.css";
import React, { useState } from "react";
import Template from "./components/Template";
import Home from "./components/Home";
import VenueDetail from "./components/VenueDetail";
import AddComment from "./components/AddComment";
import About from "./components/About";
import Admin from "./components/Admin";
import Login from "./components/Login";
import AddUpdateVenue from "./components/AddUpdateVenue";
import PageNotFound from "./components/PageNotFound";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";

const App = () => {

    const [authControl, setAuthControl] = useState(false);
    const [tokenCtrl, setTokenCtrl] = useState();

    return (
        <div>
            <Routes>
                <Route path="/" element={<Template />}>
                    <Route path="/" element={<Home authControl={authControl}/>} />
                    <Route path="venue/:id" element={<VenueDetail />} />
                    <Route path="venue/:id/comment/new" element={<AddComment authControl={authControl} tokenCtrl={tokenCtrl}/>} />
                    <Route path="about" element={<About />} />
                    <Route path="login" element={<Login setAuthControl={setAuthControl} setTokenCtrl={setTokenCtrl} />} />
                    <Route path="signup" element={<Register setAuthControl={setAuthControl} setTokenCtrl={setTokenCtrl} />}/>
                    <Route path="admin" element={<Admin authControl={authControl} />} />
                    <Route path="admin/addupdate/venue/:id" element={<AddUpdateVenue authControl={authControl} />} />
                    <Route path="admin/addupdate/venue/new" element={<AddUpdateVenue authControl={authControl} />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App;