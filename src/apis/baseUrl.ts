import axios from "axios";
// import { encode } from "base-64";

const bssURL = "https://app.weatherwalay.com/conv";

const basicBss = {
  username: "xyww_Auth-#2023!z",
  password: "we@ther_Web%20Plan",
};

// const basicTokenBss = encode(`${basicBss.username}:${basicBss.password}`);
const basicTokenBss = btoa(`${basicBss.username}:${basicBss.password}`);

const BSS_URL = axios.create({
  baseURL: bssURL,
  headers: {
    Authorization: `Basic ${basicTokenBss}`,
  },
});

export { BSS_URL };
