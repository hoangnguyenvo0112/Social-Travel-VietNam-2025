import axios from "axios";

export const getDataAPI = async (url, token) => {
  const res = await axios.get(`https://travelbee-api-production.onrender.com/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};

export const postDataAPI = async (url, post, token) => {
  const res = await axios.post(`https://travelbee-api-production.onrender.com/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const putDataAPI = async (url, post, token) => {
  const res = await axios.put(`https://travelbee-api-production.onrender.com/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const patchDataAPI = async (url, post, token) => {
  const res = await axios.patch(`https://travelbee-api-production.onrender.com/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const deleteDataAPI = async (url, token) => {
  const res = await axios.delete(`https://travelbee-api-production.onrender.com/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};
