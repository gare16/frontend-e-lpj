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
import { useRouter } from "next/navigation";

const SaveUpdateProfile = ({ id, datas }: any) => {
  const route = useRouter();
  const handleUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await postData(`/user/update/${id.id}`, {
        datas,
      });

      toast.success(`${response?.data?.message}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        route.push("/dashboard/profile");
      }, 1500);
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
        <button className="border px-6 py-3 bg-blue text-white rounded-lg">
          Submit
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
            <button className="text-body border-none">No</button>
          </DialogClose>
          <button
            className="px-4 py-2 bg-blue text-white rounded-full"
            type="submit"
            onClick={handleUpdate}
          >
            <DialogClose>Yes</DialogClose>
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaveUpdateProfile;
