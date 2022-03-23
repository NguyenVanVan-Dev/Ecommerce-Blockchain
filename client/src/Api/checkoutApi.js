import axiosClient from "./axiosClient";

const checkoutApi = {

  checkout: (params) => {
    const url = `/checkout/store`;
    return axiosClient.post(url,params);
  },

}

export default checkoutApi;