import axiosClient from "./axiosClient";

const categoryApi = {

  getAll: (params) => {
    const url = `/category/show`;
    return axiosClient.get(url,{ params });
  },
  detail: (params) => {
    const url = `/category/detail`;
    return axiosClient.get(url,{ params });
  },
  delete: (params) => {
    const url = `/category/delete`;
    return axiosClient.delete(url,{ params });
  }
}

export default categoryApi;