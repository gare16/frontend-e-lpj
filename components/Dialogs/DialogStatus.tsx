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
import { postData } from "@/lib/api";
import { Button } from "../ui/button";

const DialogUpdateStatus = ({ id }: any) => {
  const username = localStorage.getItem("name");
  const handleUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await postData(`/laporan/status/${id}`, {
        status: "Done",
        verifikatorName: username,
      });
      // window.location.reload();
      toast.success("Done", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-transparent hover:bg-transparent">
          <svg
            className="bg-green text-white w-12 h-12 shadow-md rounded-lg p-2"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.3285 1.13607C10.1332 0.940809 9.81662 0.940808 9.62136 1.13607C9.42609 1.33133 9.42609 1.64792 9.62136 1.84318L10.2744 2.49619L5.42563 6.13274L4.31805 5.02516C4.12279 4.8299 3.80621 4.8299 3.61095 5.02516C3.41569 5.22042 3.41569 5.537 3.61095 5.73226L5.02516 7.14648L6.08582 8.20714L2.81545 11.4775C2.62019 11.6728 2.62019 11.9894 2.81545 12.1846C3.01072 12.3799 3.3273 12.3799 3.52256 12.1846L6.79293 8.91425L7.85359 9.97491L9.2678 11.3891C9.46306 11.5844 9.77965 11.5844 9.97491 11.3891C10.1702 11.1939 10.1702 10.8773 9.97491 10.682L8.86733 9.57443L12.5039 4.7257L13.1569 5.37871C13.3522 5.57397 13.6687 5.57397 13.864 5.37871C14.0593 5.18345 14.0593 4.86687 13.864 4.6716L12.8033 3.61094L11.3891 2.19673L10.3285 1.13607ZM6.13992 6.84702L10.9887 3.21047L11.7896 4.01142L8.15305 8.86015L6.13992 6.84702Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader className="items-center">
          <DialogTitle className="text-2xl font-bold text-black">
            Want to Save ?
          </DialogTitle>
          <br />
        </DialogHeader>
        <DialogFooter className="flex gap-10">
          <DialogClose>
            <Button variant={"outline"} className="text-body border-none">
              No
            </Button>
          </DialogClose>
          <Button
            className="px-4 py-2 bg-blue text-white rounded-full"
            type="submit"
            onClick={handleUpdate}
          >
            <DialogClose>Yes</DialogClose>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogUpdateStatus;
