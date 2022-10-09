import React from "react";
import { userService } from "../services/user.service";

const CouponList = () => {
  const handleClick = () => {
    if (userService.hasPermission("CAN_CLICK_BUTTON")) {
      window.alert("Hello world!");
    } else {
      console.log("Kullanıcının Yetkisi Bulunmamaktadır.");
    }
  };

  return (
    <div className="App">
      <>CouponListPage</>
      <br></br>
      <button onClick={handleClick}>
        Sadece Yetkisi Olan Kullanıcılar Tıklayabilir.
      </button>
    </div>
  );
};

export default CouponList;
