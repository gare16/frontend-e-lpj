"use client";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { DialogAddMonitoring } from "../Dialogs/DialogAddMonitoring";
import { useEffect, useLayoutEffect, useState } from "react";
import { getApi } from "@/lib/api";
import { resultLaporan } from "@/types/laporan";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DialogDeleteMonitoring from "../Dialogs/DialogDeleteMonitoring";
import { HeaderTableChecking } from "../datas/data-checking";
import Link from "next/link";

export function TableListChecking() {
  const [datas, setDatas] = useState<resultLaporan[]>([]);
  const [search, setSearch] = useState("");
  const headTable = HeaderTableChecking;

  const rupiah = (total: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(total);
  };

  const api = async () => {
    const laporan = await getApi("/laporan", `${search}`);
    setDatas(laporan.data.result);
  };

  useEffect(() => {
    api();
  }, [search]);

  const renderRows = () => {
    return datas.map((data, key) => {
      const getPYear: number = new Date(
        data.tanggal_pengajuan
      ).getUTCFullYear();
      const getPMonth: number = new Date(data.tanggal_pengajuan).getUTCMonth();
      const getPDay: number = new Date(data.tanggal_pengajuan).getUTCDay();

      const getSYear: number = new Date(data.tanggal_selesai).getUTCFullYear();
      const getSMonth: number = new Date(data.tanggal_selesai).getUTCMonth();
      const getSDay: number = new Date(data.tanggal_selesai).getUTCDay();

      const allPDate = new Date(Date.UTC(getPYear, getPMonth, getPDay));
      const allSDate = new Date(Date.UTC(getSYear, getSMonth, getSDay));

      const monthPengajuan = new Intl.DateTimeFormat("en-US", {
        month: "long",
      }).format(allPDate);

      const monthSelesai = new Intl.DateTimeFormat("en-US", {
        month: "long",
      }).format(allSDate);

      return (
        <TableRow className="bg-gray-100" key={key}>
          <TableCell className="text-center">{key + 1}</TableCell>
          <TableCell className=" text-center font-medium">
            {data.kode_mak}
          </TableCell>
          <TableCell className="hidden text-center hover:underline sm:table-cell">
            <Link href={`checking/${data.id}`}>{data.deskripsi}</Link>
          </TableCell>
          <TableCell className="hidden text-center sm:table-cell">
            {data.tipe}
          </TableCell>
          <TableCell className="text-right">
            <div className="flex flex-col">{rupiah(data.nilai_lpj)}</div>
          </TableCell>
          <TableCell className="hidden text-center sm:table-cell">
            <div className="flex flex-col">
              <p className="text-meta-1 text-center">
                {getPDay}/{getPYear}
              </p>
              <p className="font-medium text-bodydark2 text-center">
                {monthPengajuan}
              </p>
            </div>
          </TableCell>
          <TableCell className="hidden text-center sm:table-cell">
            <div className="flex flex-col">
              <p className="text-meta-1 text-center">
                {getSDay}/{getSYear}
              </p>
              <p className="font-medium text-bodydark2 text-center">
                {monthSelesai}
              </p>
            </div>
          </TableCell>

          <TableCell className="text-center capitalize">
            {data.verifikatorName}
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <main className="p-4 md:p-6 border border-graydark rounded-md">
      <div className="overflow-x-auto bg-whiten dark:bg-transparent">
        <div className="flex justify-end mb-6">
          <form onSubmit={api}>
            <input
              type="text"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Type to search..."
              className="w-full border rounded-md bg-transparent pl-9 pr-4 py-2 font-medium focus:outline-none xl:w-94"
            />
          </form>
        </div>
        <Table className="">
          <TableHeader className="bg-bodydark text-black">
            <TableRow>
              {headTable.map((head, key) => {
                return (
                  <TableHead className="text-center" key={key}>
                    {head.HTChecking}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>{renderRows()}</TableBody>
        </Table>
      </div>
      <ToastContainer
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
    </main>
  );
}
