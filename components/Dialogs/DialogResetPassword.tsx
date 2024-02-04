"use client";
import React, { useState } from "react";
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
const DialogResetPassword = ({ id }: any) => {
  const [password, setPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [v_new_password, setVNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const mapped = Object.keys(id).map((i: any) => {
    return id[i].id;
  });

  const handleReset = async () => {
    try {
      if (new_password !== v_new_password) {
        setMessage("Password Tidak Cocok!");
        setTimeout(() => {
          setMessage("");
        }, 1500);
      } else {
        const result = await postData(`/user/update/${mapped}`, {
          password,
          new_password,
        });
        setMessage(result?.data?.message || "");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-4 mb-5 rounded-lg text-white bg-blue hover:bg-lightblue">
          Reset Password
        </button>
      </DialogTrigger>
      <DialogContent className=" bg-white">
        <DialogHeader className="items-center">
          <DialogTitle>Ralat</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label className="text-left">Old Password</Label>
            <Input
              type="text"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Label className="text-left">New Password</Label>
            <Input
              type="text"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Label className="text-left">Confirm New Password</Label>
            <Input
              type="text"
              onChange={(e) => setVNewPassword(e.target.value)}
            />
          </div>
          <div>
            <p className="text-meta-1">{message}</p>
          </div>
        </div>
        <DialogFooter className="">
          <button
            className="px-4 py-2 bg-blue text-white rounded-md"
            type="submit"
            onClick={handleReset}
          >
            Tambah
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogResetPassword;
