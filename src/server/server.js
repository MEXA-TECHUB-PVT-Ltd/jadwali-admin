import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3025",
});

export const get = async (url, token, id) => {
  let res, err;
  try {
    const response = await api.get(url, {
      headers: {
        id: id,
        Authorization: `${token}`,
      },
    });
    res = response.data;
  } catch (error) {
    err = error;
  }
  return { res, err };
};

export const post = async (url, token, id, body) => {
  let res, err;
  try {
    const response = await api.post(url, body, {
      headers: {
        id: id,
        Authorization: token,
      },
    });
    res = response.data;
  } catch (error) {
    err = error;
  }
  return { res, err };
};

export const put = async (url, token, id, body) => {
  let res, err;
  try {
    const response = await api.put(url, body, {
      headers: {
        id: id,
        Authorization: token,
      },
    });
    res = response.data;
  } catch (error) {
    err = error;
  }
  return { res, err };
};

export const del = async (url, token, id) => {
  let res, err;
  try {
    const response = await api.delete(url, {
      headers: {
        id: id,
        Authorization: token,
      },
    });
    res = response.data;
  } catch (error) {
    err = error;
  }
  return { res, err };
};
