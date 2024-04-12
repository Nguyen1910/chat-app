import api from "../axios";

export class BaseService {
  put = (url: string, model: Object) => {
    return api({
      url: url,
      method: "PUT",
      data: model,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      }, //JWT
    });
  };
  patch = (url: string, model: Object) => {
    return api({
      url: url,
      method: "PATCH",
      data: model,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      }, //JWT
    });
  };

  post = (url: string, model: Object | FormData) => {
    return api({
      url: url,
      method: "POST",
      data: model,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      }, //JWT
    });
  };

  get = (url: string, params?: Object) => {
    return api({
      url: url,
      params: { ...params } || null,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
  };

  delete = (url: string, params = {}, model = {}) => {
    return api({
      url: url,
      method: "DELETE",
      params: params,
      data: model,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
  };
}
