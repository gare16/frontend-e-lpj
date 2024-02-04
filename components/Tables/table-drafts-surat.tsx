"use client";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { getApi } from "@/lib/api";
import { Surat } from "@/types/laporan";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DialogAddSurat } from "../Dialogs/DialogAddSurat";
import DialogDeleteSurat from "../Dialogs/DialogDeleteSurat";
import Link from "next/link";

export function TableDrafts() {
  const [datas, setDatas] = useState<Surat[]>([]);

  const api = async () => {
    const surat = await getApi("/surat");
    setDatas(surat?.data?.result);
  };

  useEffect(() => {
    api();
  }, []);

  const renderRows = () => {
    return datas.map((data, key) => {
      return (
        <TableRow className={"bg-gray-100"} key={key}>
          <TableCell>0{key + 1}</TableCell>
          <TableCell className="hidden text-center capitalize  sm:table-cell hover:underline">
            <Link
              href={`${process.env.BASE_URL_API}/view/surat/${data.id}`}
              target="_blank"
            >
              {data.deskripsi}
            </Link>
          </TableCell>
          <TableCell className="hidden text-center sm:table-cell">
            {data.keterangan}
          </TableCell>
          <TableCell className="hidden text-center sm:table-cell">
            {data.tipe}
          </TableCell>
          <TableCell className="text-center capitalize">
            <DialogDeleteSurat props={data.id} />
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <main className="w-230 p-4 md:p-6 border border-graydark rounded-md">
      <div className="overflow-x-auto bg-whiten dark:bg-transparent">
        <div className="mb-6 flex justify-between">
          <div className="flex gap-2 ms-2"></div>

          <DialogAddSurat />
        </div>
        <Table className="">
          <TableHeader className="bg-bodydark text-black">
            <TableRow>
              <TableHead className="w-[2px] md:w-auto">No</TableHead>
              <TableHead className="w-[100px] text-center md:w-auto">
                Deskripsi
              </TableHead>
              <TableHead className="hidden text-center sm:table-cell">
                Keterangan
              </TableHead>
              <TableHead className="hidden text-center sm:table-cell">
                Format
              </TableHead>
              <TableHead className="hidden text-center sm:table-cell">
                Aksi
              </TableHead>
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
