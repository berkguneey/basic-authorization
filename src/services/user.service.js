import jwt_decode from "jwt-decode";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjk2ODMxMzQxLCJyb2xlIjoiU0VMTEVSIn0.F9Go0GE20u054HTAbpwSVso-l_GxisuCaN3JLNHobhA";

const fakeLoginResponse = {
  name: "John Doe",
  role: "SELLER",
  jwtToken: token,
  permissions: [
    {
      page: "CouponList",
      pageUrl: "/coupon-list",
      description: "Kupon Listeleme",
      actions: ["CAN_CLICK_BUTTON"],
    },
    {
      page: "CampaignList",
      pageUrl: "/campaign-list",
      description: "Kampanya Listeleme",
    },
    {
      page: "Home",
      pageUrl: "/",
      description: "Anasayfa",
    },
  ],
};

localStorage.setItem("token", JSON.stringify(token));

function getAuthentication() {
  return jwt_decode(localStorage.getItem("token"));
}

function getUserRole() {
  return getAuthentication().role;
}

function getAuthorizedPages() {
  return fakeLoginResponse.permissions;
}

function getUserActions() {
  return fakeLoginResponse.permissions.find(
    (permission) => permission.pageUrl === window.location.pathname
  ).actions;
}

function hasPermission(action) {
  return getUserActions().includes(action) || getUserActions().includes("*");
}

export const userService = {
  getAuthentication,
  getAuthorizedPages,
  getUserRole,
  getUserActions,
  hasPermission,
};
