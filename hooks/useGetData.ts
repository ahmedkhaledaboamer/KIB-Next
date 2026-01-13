import baseUrl from "../Api/baseURL";

const useGetData = async (url: string, params?: any) => {
  const res = await baseUrl.get(url, params);
  return res.data;
};

const useGetDataToken = async (url: string, params?: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const res = await baseUrl.get(url, config);
  return res.data;
};

export { useGetData, useGetDataToken };
