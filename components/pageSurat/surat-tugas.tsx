"use client";
import TemplateST from "@/components/TempletePDF/templete-surat-tugas";
import { Input } from "@/components/ui/input";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import dynamic from "next/dynamic";
import jsPDF from "jspdf";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import Loader from "../common/Loader";

const SuratTugas = () => {
  const [value, setValue] = useState("");
  const [tanggal, setTanggal] = useState<Date>();
  const [nomor, setNomor] = useState("");
  const [kota, setKota] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [nama, setNama] = useState("");

  const [loader, setLoader] = useState(false);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
  const myModule = {
    toolbar: toolbarOptions,
  };
  const handleDownload = () => {
    const capture: any = document.querySelector(
      ".receipt-pdf"
    ) as HTMLInputElement | null;
    setLoader(true);
    html2canvas(capture).then(async (canvas) => {
      const date = Date.now();
      const tgl = new Date(date).toLocaleDateString();
      const imgData = canvas.toDataURL("/images/logo/bappenasLogo.png");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save(`surat_tugas_${tgl}.pdf`);
    });
  };

  return (
    <main className="flex gap-10">
      <div>
        <form className="flex flex-col gap-4 mb-10 justify-center">
          <div className="flex flex-col">
            <label>No.</label>
            <Input
              placeholder="Nomor Surat Tugas"
              onChange={(e) => setNomor(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label>Isi</label>
            <ReactQuill
              className="w-96 dark:bg-white"
              modules={myModule}
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </div>
          <div className="flex flex-col">
            <label>Kota</label>
            <Input
              placeholder="Kota"
              onChange={(e) => setKota(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label>Tanggal</label>
            <Input
              placeholder="tanggal"
              type="date"
              onChange={(e: any) =>
                setTanggal(
                  e.target.valueAsDate.toLocaleDateString("id-ID", options)
                )
              }
            />
          </div>
          <div className="flex flex-col">
            <label>Jabatan</label>
            <Input
              placeholder="Jabatan"
              onChange={(e) => setJabatan(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label>Nama</label>
            <Input
              placeholder="Nama"
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
        </form>
        <Button
          className="text-white my-4"
          onClick={handleDownload}
          disabled={!(loader === false)}
        >
          {loader ? (
            <span>
              <Loader />
            </span>
          ) : (
            <span>Download</span>
          )}
        </Button>
      </div>
      <div className="receipt-pdf">
        <TemplateST
          no={nomor}
          isi={value}
          kota={kota}
          tanggal={tanggal}
          jabatan={jabatan}
          nama={nama}
        />
      </div>
    </main>
  );
};

export default SuratTugas;
