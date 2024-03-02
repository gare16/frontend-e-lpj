"use client";
import {
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { useState } from "react";
import { KodeMak } from "@/types/kode-mak";
import { Date } from "@/types/date";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getApi, postData } from "@/lib/api";

export function DialogAddMonitoring({ pagu }: any) {
  const [number, setNumber] = useState("");
  const [kode_mak, setKodeMak] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [nilai_lpj, setNilaiLPJ] = useState(0);
  const [tanggal_pengajuan, setTanggalPengajuan] = useState<Date>();
  const [tanggal_selesai, setTanggalSelesai] = useState<Date>();

  const generateNumber = async () => {
    try {
      const result = await getApi("/laporan", "");
      const type = result?.data?.result.length;
      setNumber("EP000" + type);
    } catch (error) {}
  };

  const rupiah = (total: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(total);
  };

  const handleAdd = async () => {
    const name = localStorage.getItem("name");
    try {
      const result = await postData("/laporan", {
        kode_mak,
        nilai_lpj,
        deskripsi,
        tanggal_pengajuan,
        tanggal_selesai,
        authorName: name,
      });
      toast.success(`${result.data?.message}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      toast.error(`${error.response?.data?.message}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const options = KodeMak;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="px-4 py-2 flex rounded-lg bg-blue text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add Data
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader className="items-center">
          <DialogTitle>Pengajuan E-LPJ</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label className="text-left">No</Label>
            <div className="flex gap-2">
              <Input placeholder={number} disabled />
              <button
                onClick={generateNumber}
                className="text-white bg-blue p-2 rounded-lg"
              >
                Generate
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Label className="text-left">Kode Mak</Label>
            <div className="relative z-20 bg-white dark:bg-form-input">
              <Select
                options={options}
                className="border border-input rounded"
                getOptionValue={(option: any) => {
                  return option.value;
                }}
                onChange={(e) => {
                  setKodeMak(e.value);
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Label className="text-left">Tanggal Pengajuan</Label>
            <Input
              id="name"
              placeholder="Tanggal"
              type="date"
              onChange={(e: any) => {
                setTanggalPengajuan(e.target.valueAsDate);
              }}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Label className="text-left">Tanggal Selesai</Label>
            <Input
              id="name"
              placeholder="Tanggal"
              type="date"
              onChange={(e: any) => setTanggalSelesai(e.target.valueAsDate)}
            />
          </div>

          <div className="flex justify-evenly gap-4">
            <div className="flex flex-col gap-4">
              <Label className="text-left">Nilai LPJ</Label>
              <Input
                id="name"
                placeholder="Masukan Nilai"
                onChange={(e: any) => setNilaiLPJ(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-4">
              <Label className="text-left">Nilai Pagu</Label>
              <Input id="name" placeholder={rupiah(pagu)} disabled />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Label className="text-left">Deskripsi</Label>
            <Input
              id="name"
              placeholder="Masukan Keterangan"
              onChange={(e) => setDeskripsi(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="">
          <button
            disabled={
              !kode_mak ||
              !tanggal_pengajuan ||
              !tanggal_selesai ||
              !nilai_lpj ||
              !deskripsi
            }
            className="px-4 py-2 bg-blue text-white rounded-md"
            type="submit"
            onClick={handleAdd}
          >
            <DialogClose>Tambah</DialogClose>
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
