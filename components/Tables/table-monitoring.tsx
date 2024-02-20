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
  const [currentPage, setCurrentPage] = useState(0);
  const [nextPage, setNextPage] = useState(10);

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
    const laporan = await getApi(
      "/laporan",
      `${search}&currentPage=${currentPage}&nextPage=${nextPage}`
    );
    setDatas(laporan?.data?.result);
  };

  useEffect(() => {
    api();
    const pagus = async () => {
      const pagu = await getApi("/anggaran/2024");
      setPagu(pagu?.data?.result?.totalPagu);
    };
    pagus();
  }, [search]);

  useEffect(() => {
    api();
  }, [currentPage, nextPage]);

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
      <footer className="w-full flex justify-between mt-6">
        <section>
          Page {currentPage + 1} of {nextPage}
        </section>
        <section className="flex gap-6">
          <button
            disabled={currentPage === 0}
            className="border shadow-lg rounded-lg p-2"
            onClick={() => {
              setCurrentPage(currentPage - 10);
              nextPage >= 10 ? null : setNextPage(nextPage - 10);
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <button
            className="border shadow-lg rounded-lg p-2"
            onClick={() => {
              setCurrentPage(currentPage + 10);
              setNextPage(nextPage + 10);
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </section>
      </footer>
    </main>
  );
}
