"use client";

import React from "react";
import {
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getApi } from "@/lib/api";
import { Button } from "../ui/button";

const DialogDeleteSurat = ({ props }: any) => {
  const handleDelete = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await getApi(`/surat/${props.toString()}`);
      window.location.reload();
    } catch (error: any) {
      toast.error(`${error?.response?.data?.message}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // Handle success
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-transparent hover:bg-transparent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="red"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-6 h-6 bg-white shadow-sm shadow-graydark p-1 rounded-md"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader className="items-center">
          <DialogTitle className="text-2xl font-bold text-black">
            Want to Delete ?
          </DialogTitle>
          <p className="mx-10">Are u sure want to delete the file ?. You</p>
          <p>
            will
            <span className="text-meta-1"> not be able to </span>
            recover them
          </p>
        </DialogHeader>
        <DialogFooter className="flex gap-10">
          <DialogClose>
            <Button variant={"outline"} className="text-body border-none">
              Cancel
            </Button>
          </DialogClose>
          <button
            className="px-4 py-2 bg-meta-1 text-white rounded-md"
            type="submit"
            onClick={handleDelete}
          >
            <DialogClose>Delete</DialogClose>
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDeleteSurat;
