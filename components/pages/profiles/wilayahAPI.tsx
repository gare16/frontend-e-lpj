import { Label } from "@/components/ui/label";
import React, { useEffect, useReducer, useState } from "react";
import { Address, reducer } from "@/hooks/useSelectAddress";
import axios from "axios";
import { AddressW, reducerWilayah } from "@/hooks/useReducerWilayah";

let API_PROVINCE =
  "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json";

let initialState: Address = {
  url: API_PROVINCE,
};

let initWilayah: AddressW = {
  province: "",
  daerah: "",
  kecamatan: "",
  kelurahan: "",
};

const WilayahAPI = ({ dataAddress }: any) => {
  const [data_provinsi, setDataProvinsi] = useState<any[]>([]);
  const [data_daerah, setDataDaerah] = useState<any[]>([]);
  const [data_kecamatan, setDataKecamatan] = useState<any[]>([]);
  const [data_kelurahan, setDataKelurahan] = useState<any[]>([]);

  const [provinsi, setProvinsi] = useState("");
  const [daerah, setDaerah] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kelurahan, setKelurahan] = useState("");

  const [state, dispatch] = useReducer(reducer, initialState);
  const [stateW, disp] = useReducer(reducerWilayah, initWilayah);

  useEffect(() => {
    const fetchProvinsi = async () => {
      const result = await axios.get(state.url);
      setDataProvinsi(result?.data);
    };
    fetchProvinsi();
  }, []);

  useEffect(() => {
    const fetchDaerah = async () => {
      const result = await axios.get(state.url);
      setDataDaerah(result?.data);
    };
    fetchDaerah();
  }, [provinsi]);

  useEffect(() => {
    const fetchKecamatan = async () => {
      const result = await axios.get(state.url);
      setDataKecamatan(result?.data);
    };
    fetchKecamatan();
  }, [daerah]);

  useEffect(() => {
    const fetchKelurahan = async () => {
      const result = await axios.get(state.url);
      setDataKelurahan(result?.data);
    };
    fetchKelurahan();
  }, [kecamatan]);

  useEffect(() => {
    dataAddress(stateW);
  }, [stateW.kelurahan, kelurahan]);

  const handleProvinsi = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    const split = value.split(",");
    dispatch({
      type: "ADD_DAERAH",
      payload: {
        url: `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${split[0]}.json`,
      },
    });
    disp({
      type: "ADD_PROVINCE",
      payload: {
        province: split[1],
        daerah: "",
        kecamatan: "",
        kelurahan: "",
      },
    });
    const result = await axios.get(state.url);
    setDataDaerah(result?.data);
    setProvinsi(split[1]);
  };
  const handleDaerah = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const split = value.split(",");
    dispatch({
      type: "ADD_DAERAH",
      payload: {
        url: `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${split[0]}.json`,
      },
    });
    disp({
      type: "ADD_DAERAH",
      payload: {
        province: "",
        daerah: split[1],
        kecamatan: "",
        kelurahan: "",
      },
    });
    setDaerah(split[1]);
  };
  const handleKecamatan = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const split = value.split(",");
    dispatch({
      type: "ADD_DAERAH",
      payload: {
        url: `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${split[0]}.json`,
      },
    });
    disp({
      type: "ADD_KECAMATAN",
      payload: {
        province: "",
        daerah: "",
        kecamatan: split[1],
        kelurahan: "",
      },
    });
    setKecamatan(split[1]);
  };
  const handleKelurahan = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const split = value.split(",");
    setKelurahan(split[1]);
    disp({
      type: "ADD_KELURAHAN",
      payload: {
        province: "",
        daerah: "",
        kecamatan: "",
        kelurahan: split[1],
      },
    });
  };

  return (
    <div className="flex flex-col">
      <Label>Province</Label>
      <select
        className="p-2 border rounded-lg bg-white my-1 mt-3"
        onChange={handleProvinsi}
      >
        {data_provinsi.map((data, i) => {
          return (
            <option value={[data.id, data.name]} key={i}>
              {data.name}
            </option>
          );
        })}
      </select>
      {!provinsi ? null : (
        <>
          <Label>District</Label>
          <select
            className="p-2 border rounded-lg bg-white my-1 mt-3"
            onChange={handleDaerah}
          >
            {data_daerah.map((data, i) => {
              return (
                <option value={[data.id, data.name]} key={i}>
                  {data.name}
                </option>
              );
            })}
          </select>
        </>
      )}
      {!daerah ? null : (
        <>
          <Label>Sub District</Label>
          <select
            onChange={handleKecamatan}
            className="p-2 border rounded-lg bg-white my-1 mt-3"
          >
            {data_kecamatan.map((data, i) => {
              return (
                <option value={[data.id, data.name]} key={i}>
                  {data.name}
                </option>
              );
            })}
          </select>
        </>
      )}
      {!kecamatan ? null : (
        <>
          <Label>Urban Village</Label>
          <select
            onChange={handleKelurahan}
            className="p-2 border rounded-lg bg-white my-1 mt-3"
          >
            {data_kelurahan.map((data, i) => {
              return (
                <option value={[data.id, data.name]} key={i}>
                  {data.name}
                </option>
              );
            })}
          </select>
        </>
      )}
    </div>
  );
};

export default WilayahAPI;
