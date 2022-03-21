import axiosClient from "./axiosClient";

const productApi = {

  getAll: (params) => {
    const url = `/product/show`;
    return axiosClient.get(url,{ params });
  },
  store: (data) => {
    const url = `/product/store`;
    return axiosClient.post(url,data);
  },
  detail: (params) => {
    const url = `/product/detail`;
    return axiosClient.get(url,{params});
  },
  delete: (params) => {
    const url = `/product/delete`;
    return axiosClient.delete(url,{ params });
  },
  update: (data) => {
    const url = `/product/update`;
    return axiosClient.put(url,data);
  },
}

export default productApi;