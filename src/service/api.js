import axios from "axios";

const url = 'https://notelab-backend.vercel.app';
// const url = "https://notelab-backend.vercel.app";

const api = axios.create({
  baseURL: url,
  withCredentials: true,
});

const request = async (method, url, data = null) => {
  try {
    const config = {};

    if (url === "/subject/add") {
      config.headers = { "Content-Type": "multipart/form-data" };
    }
    const res = await api({ method, url, data, ...config });
    return { data: res.data, error: null };
  } catch (error) {
    if (error.status === 401) {
      window.location = "/login";
    }
    return {
      data: null,
      error: error.response?.data || { message: "network error" },
    };
  }
};

export const loginApi = () => request("GET", "/auth/google");
export const getUserApi = () => request("GET", "/auth/get-user");
export const logoutUserApi = () => request("GET", "/auth/logout");

// subject routes
export const getSubjectsApi = (page, limit) => request("GET", `/subject/get?page=${page || 1}&limit=${limit || 5}`);
export const searchSubjectApi = (query, page, limit) => request("GET", `/subject/search?q=${query}&page=${page || 1}&limit=${limit}`);
export const getOneSubjectApi = (id) => request("GET", `/subject/get/${id}`);
export const getSubjectsListApi = () => request("GET", "/subject/getList");
export const addSubjectApi = (data) => request("POST", "/subject/add", data);
export const updateSubjectApi = (id, data) =>
  request("PUT", `/subject/update/${id}`, data);
export const deleteSubjectApi = (id) =>
  request("DELETE", `/subject/delete/${id}`);

// unit routes

export const getUnitApi = (id) => request("GET", `/unit/${id}`);
export const getUnitUrlApi = (id) => request("GET", `/unit/url/${id}`);


// bookmark routes

export const getBookmarkApi = (id)=> request("GET", `/bookmark/get/${id}`);
export const addBookmarkApi = (id)=> request("POST", `/bookmark/add/${id}`)