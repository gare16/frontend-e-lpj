"use client";

import { CardListFile } from "@/components/Card/card-list-file";
import CardUpload from "@/components/Card/card-upload";
import { getApi } from "@/lib/api";
import { useParams } from "next/navigation";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadsPage = () => {
  const [datas, setDatas] = React.useState<any[]>([]);
  const id = useParams();
  const idX = id.id;

  const api = async () => {
    const laporan = await getApi(`/files/${id.id}`, "");
    setDatas(laporan.data.result.UploadFile);
  };

  React.useLayoutEffect(() => {
    api();
  }, []);

  return (
    <>
      <div>
        <h2 className="text-3xl mb-4 font-bold">Upload File</h2>
      </div>
      <div className="w-full mt-8 flex flex-wrap justify-center gap-4">
        <CardUpload id={idX} />
        {datas.map((item, key) => {
          return (
            <main key={key}>
              <CardListFile props={item} />
            </main>
          );
        })}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default UploadsPage;
