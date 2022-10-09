import "./App.css";
import React from "react";
import { Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CampaignList from "./pages/CampaignList";
import CampaignCreate from "./pages/CampaignCreate";
import CouponList from "./pages/CouponList";
import Error403 from "./pages/Error403";
import { AppRoute } from "./components/AppRoute";

const App = () => {
  return (
    <>
      <Navigation />
      <Switch>
        <AppRoute
          path="/login"
          //isProtectedRoute={false}
          component={Login}
        />
        <AppRoute
          path="/error-403"
          //isProtectedRoute={false}
          component={Error403}
        />
        <AppRoute
          path="/campaign-list"
          //isProtectedRoute={true}
          component={CampaignList}
          requiredRole={"ADMIN"}
        />
        <AppRoute
          path="/campaign-create"
          //isProtectedRoute={true}
          component={CampaignCreate}
          requiredRole={"SELLER"}
        />
        <AppRoute
          path="/coupon-list"
          //isProtectedRoute={true}
          component={CouponList}
          requiredRole={["ADMIN", "SELLER"]}
        />
        <AppRoute
          path="/"
          //isProtectedRoute={true}
          component={Home}
          requiredRole={"*"}
        />
      </Switch>
    </>
  );
};

const Navigation = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/campaign-list">Kampanya Listele</Link>
      </li>
      <li>
        <Link to="/campaign-create">Kampanya Oluştur</Link>
      </li>
      <li>
        <Link to="/coupon-list">Kupon Listele</Link>
      </li>
    </ul>
  </nav>
);

export default App;
