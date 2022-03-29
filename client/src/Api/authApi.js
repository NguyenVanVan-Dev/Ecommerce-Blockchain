import axiosClient from "./axiosClient";

const authorizationApi = {

  login: (params) => {
    const url = `/admin/login`;
    return axiosClient.post(url,params);
  },
  register:(params) => {
    const url = `/admin/register`;
    return axiosClient.post(url,params);
  },
  resetLogin:(params) => {
    const url = `/admin/reset-login`;
    return axiosClient.post(url,params);
  },
  loginGoogle: (params) => {
    const url = `/admin/login/google`;
    return axiosClient.post(url,params);
  },
  forgotPass:(params) => {
    const url = '/admin/forgot-password';
    return axiosClient.put(url,params);
  },
  resetPassword:(params) => {
    const url = '/admin/reset-password';
    return axiosClient.put(url,params);
  },
  loginUser: (params) => {
    const url = `/user/login`;
    return axiosClient.post(url,params);
  },
  registerUser:(params) => {
    const url = `/user/register`;
    return axiosClient.post(url,params);
  },
}

export default authorizationApi;