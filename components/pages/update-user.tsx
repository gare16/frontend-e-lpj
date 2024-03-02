"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import WilayahAPI from "./profiles/wilayahAPI";
import SaveUpdateProfile from "../Dialogs/DialogNotificationUpdateProfile";
import { useParams } from "next/navigation";
import { Date } from "@/types/date";

type PayloadProfile = {
  first_name: string;
  last_name: string;
  nik: string;
  tempat_lahir: string;
  tanggal_lahir: Date | any;
  posisi: string;
  agama: string;
  jenis_kelamin: string;
  hobby: string;
  nomor_hp: string;
  kode_pos: string;
  alamat: string;
  provinsi: string;
  daerah: string;
  kecamatan: string;
  kelurahan: string;
};

const UpdateUser = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [nik, setNik] = useState("");
  const [tempat_lahir, setTempatLahir] = useState("");
  const [tanggal_lahir, setTanggalLahir] = useState<Date | any>();
  const [posisi, setPosisi] = useState("");
  const [agama, setAgama] = useState("");
  const [jenis_kelamin, setJenisKelamin] = useState("male");
  const [hobby, setHobby] = useState("");
  const [nomor_hp, setNomorHP] = useState("");
  const [alamat, setAlamat] = useState("");
  const [kode_pos, setKodePos] = useState("");

  const id = useParams();

  const [wilayah, setWilayah] = useState<object | any>();

  const payload: PayloadProfile = {
    agama: agama,
    alamat: alamat,
    provinsi: wilayah?.province,
    daerah: wilayah?.daerah,
    kecamatan: wilayah?.kecamatan,
    kelurahan: wilayah?.kelurahan,
    first_name: first_name,
    hobby: hobby,
    jenis_kelamin: jenis_kelamin,
    kode_pos: kode_pos,
    last_name: last_name,
    nik: nik,
    nomor_hp: nomor_hp,
    posisi: posisi,
    tanggal_lahir: tanggal_lahir,
    tempat_lahir: tempat_lahir,
  };

  const handleDataWilayah = (newData: object) => {
    setWilayah(newData);
  };
  return (
    <>
      <div className="w-full h-screen flex">
        <div className="w-1/2 flex flex-wrap gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label className="text-left">First Name</Label>
            <Input
              type="text"
              placeholder="Ex. Jacob"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Label className="text-left">Last Name</Label>
            <Input
              type="text"
              placeholder="Ex. Jonathan"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Label className="text-left">NIK/NIP</Label>
            <Input
              type="text"
              placeholder="Ex. 32170793875192"
              onChange={(e) => setNik(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Label className="text-left">Posisi</Label>
            <Input
              type="text"
              onChange={(e) => {
                setPosisi(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Label className="text-left">Birth Date</Label>
            <Input
              type="date"
              className="w-50"
              onChange={(e: any) => setTanggalLahir(e.target.valueAsDate)}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Label className="text-left">Birth Place</Label>
            <Input
              type="text"
              placeholder="Ex. Jakarta"
              onChange={(e) => {
                setTempatLahir(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Label className="text-left">Agama</Label>
            <Input
              type="text"
              placeholder="Ex. Islam"
              onChange={(e) => {
                setAgama(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Label className="text-left">Gender</Label>
            <select
              className="w-50 p-2 border bg-white rounded-lg"
              onChange={(e) => setJenisKelamin(e.target.value)}
              defaultValue={"male"}
            >
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
              <option value={"-"}> - </option>
            </select>
          </div>

          <div className="flex flex-col gap-4">
            <Label className="text-left">Hobby</Label>
            <Input
              type="text"
              onChange={(e) => {
                setHobby(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Label className="text-left">Phone Number</Label>
            <Input
              type="text"
              onChange={(e) => {
                setNomorHP(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="w-1/2 flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label className="text-left">Address</Label>
            <Input
              type="text"
              onChange={(e) => {
                setAlamat(e.target.value);
              }}
            />
          </div>
          <WilayahAPI dataAddress={handleDataWilayah} />

          <div className="flex flex-col gap-4">
            <Label className="text-left">Postal Code</Label>
            <Input
              type="text"
              onChange={(e) => {
                setKodePos(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <SaveUpdateProfile datas={payload} id={id} />
      </div>
      <ToastContainer
        className={"z-9999"}
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
    </>
  );
};

export default UpdateUser;
