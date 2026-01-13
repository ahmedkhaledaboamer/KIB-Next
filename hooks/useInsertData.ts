import baseUrl from "../Api/baseURL";

const useInsertData = async (url: string, params: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const res = await baseUrl.post(url, params, config);
  return res.data;
};

const useInsertDataWithImage = async (url: string, params: any) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const res = await baseUrl.post(url, params, config);
  return res.data;
};

export { useInsertData, useInsertDataWithImage };
