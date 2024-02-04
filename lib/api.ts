import axios from "axios";

interface RequestOptions {
  // Tambahkan opsi lain yang diperlukan
  headers?: Record<string, string>;
}
export const postData = async (
  resources: any,
  data: any,
  options?: RequestOptions
) => {
  const post = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}${resources}`,
    {
      data,
    },
    options
  );
  return post;
};

export const getApi = async (resources: any, query?: any) => {
  const token = localStorage.getItem("token");
  const laporan = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}${resources}?search=${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return laporan;
};
