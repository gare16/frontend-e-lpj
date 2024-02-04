"use client";

import React from "react";
import dynamic from "next/dynamic";
const SuratTugas = dynamic(() => import("@/components/pageSurat/surat-tugas"));
const Undangan = dynamic(() => import("@/components/pageSurat/undangan"));
const Select = dynamic(() => import("react-select"));

const Page = () => {
  const options = [
    { label: "Surat Tugas", value: "surat-tugas" },
    { label: "Undangan", value: "undangan" },
  ];
  const [select, setSelect] = React.useState("");

  const selected = () => {
    return select === "surat-tugas" ? (
      <div>
        <SuratTugas />
      </div>
    ) : select === "undangan" ? (
      <div>
        <Undangan />
      </div>
    ) : (
      <p>Select First</p>
    );
  };
  return (
    <>
      <Select
        options={options}
        className="border border-input rounded mb-10"
        getOptionValue={(option: any) => {
          return option.value;
        }}
        onChange={(e: any) => {
          setSelect(e.value);
        }}
      />
      {selected()}
    </>
  );
};

export default Page;
