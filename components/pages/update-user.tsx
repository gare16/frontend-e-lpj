"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { postData } from "@/lib/api";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const UpdateUser = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [nik, setNik] = useState("");
  const [tempat_lahir, setTempatLahir] = useState("");
  const [tanggal_lahir, setTanggalLahir] = useState<Date>();
  const [posisi, setPosisi] = useState("");
  const [agama, setAgama] = useState("");
  const [jenis_kelamin, setJenisKelamin] = useState("");
  const [hobby, setHobby] = useState("");
  const [nomor_hp, setNomorHP] = useState("");
  const [alamat, setAlamat] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [daerah, setDaerah] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kelurahan, setKelurahan] = useState("");
  const [kode_pos, setKodePos] = useState("");

  const [endPoint, setEndPoint] = useState("");

  const [data_provinsi, setDataProvinsi] = useState<any[]>([]);
  const [data_Kabupaten, setDataKab] = useState<any[]>([]);

  const fetchWilayah = async () => {
    const result = await axios.get(
      "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
    );
    setDataProvinsi(result?.data);
  };

  const handleOnChangeSelected = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    const split = value.split(",");
    setEndPoint(split[0]);
    setProvinsi(split[1]);
  };
  useEffect(() => {
    fetchWilayah();
  }, []);

  const id = useParams;

  const handleReset = async () => {
    try {
      const result = await postData(`/user/update/${id}`, {
        first_name,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 flex flex-wrap gap-4 py-4">
        <div className="flex flex-col gap-4">
          <Label className="text-left">First Name</Label>
          <Input
            type="text"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Label className="text-left">Last Name</Label>
          <Input type="text" onChange={(e) => setLastName(e.target.value)} />
        </div>

        <div className="flex flex-col gap-4">
          <Label className="text-left">NIK/NIP</Label>
          <Input type="text" onChange={(e) => setNik(e.target.value)} />
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
            onChange={(e: any) => setTanggalLahir(e.target.valueAsDates)}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Label className="text-left">Birth Place</Label>
          <Input
            type="text"
            onChange={(e) => {
              setTempatLahir(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Label className="text-left">Agama</Label>
          <Input
            type="text"
            onChange={(e) => {
              setAgama(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Label className="text-left">Gender</Label>
          <Input
            type="text"
            onChange={(e) => {
              setJenisKelamin(e.target.value);
            }}
          />
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

      <div className="w-1/2 grid gap-4 py-4">
        <div className="flex flex-col gap-4">
          <Label className="text-left">Provinsi</Label>
          <select onChange={handleOnChangeSelected}>
            {data_provinsi.map((data, i) => {
              return (
                <option
                  key={i}
                  value={[data.id, data.name]}
                  onChange={() => console.log(data.name)}
                >
                  {data.name}
                </option>
              );
            })}
          </select>
        </div>
        {!provinsi ? null : (
          <div className="flex flex-col gap-4">
            <Label className="text-left">District</Label>
            <select onChange={handleOnChangeSelected}>
              {data_provinsi.map((data, i) => {
                return (
                  <option
                    key={i}
                    value={[data.id, data.name]}
                    onChange={() => console.log(data.name)}
                  >
                    {data.name}
                  </option>
                );
              })}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateUser;
