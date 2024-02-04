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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getApi } from "@/lib/api";

const DialogRalat = ({ props }: any) => {
  const [ralat, setRalat] = useState<any[]>([]);

  const fetchRalat = async () => {
    const result = await getApi(`/ralat/${props.id}`);
    setRalat(result?.data?.result?.ralat);
  };
  useEffect(() => {
    fetchRalat();
  }, []);

  const handleRender = () => {
    return ralat.map((data, key) => {
      const d = data.tanggal;
      const tgl = new Date(d).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      return (
        <TableRow key={key}>
          <TableCell>{data.ralat}</TableCell>
          <TableCell>{tgl}</TableCell>
          <TableCell>{data.kesalahan}</TableCell>
          <TableCell>{data.keterangan}</TableCell>
          <TableCell>{data.userInput}</TableCell>
        </TableRow>
      );
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-transparent hover:bg-transparent">
          <svg
            className="w-12 h-12 shadow-md rounded-lg p-2 bg-meta-1 text-white"
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
        <div>
          <Table>
            <TableHeader className="bg-bodydark text-black">
              <TableRow>
                <TableHead className="w-[2px] md:w-auto">Ralat</TableHead>
                <TableHead className="w-[100px] md:w-auto">Tanggal</TableHead>
                <TableHead className="hidden text-center sm:table-cell">
                  Kesalahan
                </TableHead>
                <TableHead className="hidden text-center sm:table-cell">
                  Keterangan
                </TableHead>
                <TableHead className="text-right">User Input</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{handleRender()}</TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogRalat;
