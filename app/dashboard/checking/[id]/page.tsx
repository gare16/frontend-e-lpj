"use client";
import TableBelanjaBahan from "@/components/Tables/table-belanja-bahan";
import TableBelanjaSewa from "@/components/Tables/table-belanja-sewa";
import TableKonsumsiRapat from "@/components/Tables/table-konsumsi-rapat";
import TableHonorNarasumber from "@/components/Tables/table-empat";
import TableJasaKonsultan from "@/components/Tables/table-lima";
import { getApi } from "@/lib/api";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import TablePerjalananBiasa from "@/components/Tables/table-enam";
import TablePerjalananDalamKota from "@/components/Tables/table-tujuh";
import TableMeetingDalamKota from "@/components/Tables/table-delapan";
import TableMeetingLuarKota from "@/components/Tables/table-sembilan";
import TableLuarNegeri from "@/components/Tables/table-sepuluh";
import TablePembelianBarang from "@/components/Tables/table-sebelas";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [datas, setDatas] = useState<any[]>([]);
  const [kode_mak, setKode] = useState("");
  const id = useParams();

  const api = async () => {
    const laporan = await getApi(`/laporan/${id.id}`, "");
    setDatas(laporan?.data);
    setKode(laporan?.data?.result?.kode_mak.toString());
  };

  const rupiah = (total: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(total);
  };

  useEffect(() => {
    api();
  }, []);

  const rendering = () => {
    return Object.keys(datas).map((obj: any, i) => {
      const d = new Date(datas[obj].tanggal_pengajuan);
      const tgl = d.toDateString();
      return (
        <div key={i}>
          <div className="w-full flex gap-2 h-25">
            <div className="flex flex-col w-1/2 gap-6">
              <h5>Nama Paket : {datas[obj].deskripsi}</h5>
              <h5>Nilai : {rupiah(datas[obj].nilai_lpj)}</h5>
            </div>
            <div className="flex flex-col w-1/2 gap-6">
              <h5>Kode MAK : {datas[obj].kode_mak}</h5>
              <h5>Tanggal Pengajuan : {tgl} </h5>
            </div>

            <button data-tooltip-id="tooltip-upload">
              <Link href={`/dashboard/uploads/${id.id}`}>
                <svg
                  className="w-12 h-12 shadow-md rounded-lg p-2"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.81825 1.18188C7.64251 1.00615 7.35759 1.00615 7.18185 1.18188L4.18185 4.18188C4.00611 4.35762 4.00611 4.64254 4.18185 4.81828C4.35759 4.99401 4.64251 4.99401 4.81825 4.81828L7.05005 2.58648V9.49996C7.05005 9.74849 7.25152 9.94996 7.50005 9.94996C7.74858 9.94996 7.95005 9.74849 7.95005 9.49996V2.58648L10.1819 4.81828C10.3576 4.99401 10.6425 4.99401 10.8182 4.81828C10.994 4.64254 10.994 4.35762 10.8182 4.18188L7.81825 1.18188ZM2.5 9.99997C2.77614 9.99997 3 10.2238 3 10.5V12C3 12.5538 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2238 12.2239 9.99997 12.5 9.99997C12.7761 9.99997 13 10.2238 13 10.5V12C13 13.104 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2238 2.22386 9.99997 2.5 9.99997Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </button>

            <ReactTooltip id="tooltip-upload" place="bottom" content="Upload" />
          </div>
        </div>
      );
    });
  };
  return (
    <>
      <div>{rendering()}</div>
      {kode_mak === "521211" ? (
        <TableKonsumsiRapat />
      ) : kode_mak === "521811" ? (
        <TableBelanjaBahan />
      ) : kode_mak === "522141" ? (
        <TableBelanjaSewa />
      ) : kode_mak === "522151" ? (
        <TableHonorNarasumber />
      ) : kode_mak === "522191" ? (
        <TableJasaKonsultan />
      ) : kode_mak === "524111" ? (
        <TablePerjalananBiasa />
      ) : kode_mak === "524113" ? (
        <TablePerjalananDalamKota />
      ) : kode_mak === "524114" ? (
        <TableMeetingDalamKota />
      ) : kode_mak === "524119" ? (
        <TableMeetingLuarKota />
      ) : kode_mak === "524219" ? (
        <TableLuarNegeri />
      ) : kode_mak === "536111" ? (
        <TablePembelianBarang />
      ) : (
        <h1> Tidak ada Table </h1>
      )}

      <ToastContainer
        className={"z-9999"}
        position="top-right"
        autoClose={3000}
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

export default Page;
