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
import { useEffect, useState } from "react";
import { getApi } from "@/lib/api";
import { resultLaporan } from "@/types/laporan";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DialogDeleteMonitoring from "../Dialogs/DialogDeleteMonitoring";

export function TableMonitoring() {
  const [datas, setDatas] = useState<resultLaporan[]>([]);
  const [pagu, setPagu] = useState();
  const [selected, setSelected] = useState<{ [key: string]: number }>({});
  const [search, setSearch] = useState("");
  const [selectedArr, setSelectedArr] = useState<number[]>([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    let value;
    value = localStorage.getItem("role") || "";
    setRole(value);
  }, []);

  useEffect(() => {
    setSelectedArr(Object.keys(selected).map((i) => Number(i)));
  }, [selected]);

  const handlecheckbox = (e: { target: { value: any; checked: any } }) => {
    const { value, checked } = e.target;
    const numberValue = Number(value);

    if (checked) {
      setSelected({ ...selected, [numberValue]: true });
    } else {
      const { [numberValue]: _, ...tempSelected } = selected;
      setSelected(tempSelected);
    }
  };

  const rupiah = (total: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(total);
  };

  const api = async () => {
    const laporan = await getApi("/laporan", `${search}`);
    const pagu = await getApi("/anggaran/2024");
    setDatas(laporan?.data?.result);
    setPagu(pagu?.data?.result?.totalPagu);
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
        <TableRow className={"bg-gray-100"} key={key}>
          <TableCell>
            <input
              name="checkbox"
              className="form-checkbox h-5 w-5 text-gray-600"
              type="checkbox"
              value={data.id}
              checked={data.isChecked}
              onChange={(e) => handlecheckbox(e)}
            />
          </TableCell>
          <TableCell>
            <main className="flex gap-2">
              <p>{key + 1}</p>
            </main>
          </TableCell>
          <TableCell className="font-medium">{data.deskripsi}</TableCell>
          <TableCell className="hidden text-center sm:table-cell">
            {data.kode_mak}
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            <div className="flex flex-col">
              <p className="text-meta-1 text-center">
                {getPDay}/{getPYear}
              </p>
              <p className="font-medium text-bodydark2 text-center">
                {monthPengajuan}
              </p>
            </div>
          </TableCell>
          <TableCell className="flex justify-center items-center place-items-center sm:table-cell">
            <p
              className={
                data.status === "Done"
                  ? "bg-lightblue text-blue py-1 rounded-lg font-bold text-center"
                  : data.status === "On Progress"
                  ? "bg-lightgreen text-green p-2 rounded-lg font-bold text-center"
                  : data.status === "Ralat"
                  ? "bg-meta-1 text-white py-1 rounded-lg font-bold text-center"
                  : ""
              }
            >
              {data.status}
            </p>
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            <div className="flex flex-col">
              <p className="text-meta-1 text-center">
                {getSDay}/{getSYear}
              </p>
              <p className="font-medium text-bodydark2 text-center">
                {monthSelesai}
              </p>
            </div>
          </TableCell>
          <TableCell className="text-center">
            <div className="flex flex-col">
              {rupiah(data.nilai_lpj)}
              <p className="ms-20">IDR</p>
            </div>
          </TableCell>
          <TableCell className="text-right capitalize">
            {data.authorName}
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <main className="p-4 md:p-6 border border-graydark rounded-md">
      <div className="overflow-x-auto bg-whiten dark:bg-transparent">
        <div className="mb-6 flex justify-between">
          <div className="flex gap-2 ms-2">
            <p className="flex justify-center items-center">
              {Object.keys(selected).length} Selected
            </p>
            <DialogDeleteMonitoring props={selectedArr} />
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Type to search..."
              className="w-full border rounded-md bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-94"
            />

            {role === "admin" ? null : role === "user" ? (
              <DialogAddMonitoring pagu={pagu} />
            ) : null}
          </div>
        </div>
        <Table className="">
          <TableHeader className="bg-bodydark text-black">
            <TableRow>
              <TableHead className="w-[2px] md:w-auto"></TableHead>
              <TableHead className="w-[2px] md:w-auto">No</TableHead>
              <TableHead className="w-[100px] md:w-auto">Deskripsi</TableHead>
              <TableHead className="hidden text-center sm:table-cell">
                Kode Mak
              </TableHead>
              <TableHead className="hidden text-center sm:table-cell">
                Tanggal Pengajuan
              </TableHead>
              <TableHead className="hidden text-center sm:table-cell">
                Status
              </TableHead>
              <TableHead className="hidden text-center sm:table-cell">
                Tanggal Selesai
              </TableHead>
              <TableHead className="hidden text-center sm:table-cell">
                Nilai
              </TableHead>
              <TableHead className="text-right">Input By</TableHead>
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
