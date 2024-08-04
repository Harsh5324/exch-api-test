const { default: axios } = require("axios");
const { apiBaseURL } = require("../config");

const api = {
  get: (path) =>
    new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get(apiBaseURL + path);
        return resolve(data);
      } catch (err) {
        return reject(err);
      }
    }),
  post: (path, payload) =>
    new Promise(async (resolve, reject) => {
      try {
        const config = {
          method: "post",
          maxBodyLength: Infinity,
          url: apiBaseURL + path,
          headers: {
            "Content-Type": "application/json",
          },
          data: payload,
        };

        const { data } = await axios.request(config);

        return resolve(data);
      } catch (err) {
        return reject(err);
      }
    }),
};

module.exports = api;
