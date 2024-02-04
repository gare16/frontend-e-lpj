"use client";
import React, { useEffect, useState } from "react";
import {
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { postData } from "@/lib/api";

const DialogRalat = ({ id }: any) => {
  const [ralat, setRalat] = useState("");
  const [tanggal, setTanggal] = useState<Date>();
  const [kesalahan, setKesalahan] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const idLaporan = parseInt(id.id);
  const userInput = localStorage.getItem("name");

  const handlePost = async () => {
    try {
      const post1 = await postData("/ralat", {
        data: {
          ralat,
          tanggal,
          kesalahan,
          keterangan,
          idLaporan,
          userInput,
        },
        status: "Ralat",
      });
      //   /laporan/status/${id.id}
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-transparent hover:bg-transparent">
          <svg
            className="bg-meta-1 text-white w-12 h-12 shadow-md rounded-lg p-2"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </DialogTrigger>
      <DialogContent className=" bg-white">
        <DialogHeader className="items-center">
          <DialogTitle>Ralat</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label className="text-left">Ralat</Label>
            <Input
              type="text"
              onChange={(e) => {
                setRalat(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Label className="text-left">Tanggal</Label>
            <Input
              placeholder="Tanggal"
              type="date"
              onChange={(e: any) => setTanggal(e.target.valueAsDate)}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Label className="text-left">Kesalahan</Label>
            <Input type="text" onChange={(e) => setKesalahan(e.target.value)} />
          </div>

          <div className="flex flex-col gap-4">
            <Label className="text-left">Keterangan</Label>
            <Input
              type="text"
              onChange={(e) => setKeterangan(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="">
          <button
            className="px-4 py-2 bg-blue text-white rounded-md"
            type="submit"
            onClick={handlePost}
          >
            <DialogClose>Tambah</DialogClose>
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogRalat;
