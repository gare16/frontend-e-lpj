"use client";
import { Input } from "@/components/ui/input";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TemplateUndangan from "../TempletePDF/templete-undangan";
type TipeFile = {
  value: string;
  label: string;
};
const option: TipeFile[] = [
  { label: "Surat Tugas", value: "surat-tugas" },
  { label: "Undangan", value: "undangan" },
];

const SuratTugas = () => {
  const [value, setValue] = useState("");
  const [tanggal, setTanggal] = useState<Date>();
  const [nomor, setNomor] = useState("");
  const [lampiran, setLampiran] = useState("");
  const [sifat, setSifat] = useState("");
  const [hal, setHal] = useState("");
  const [kotaPembuatan, setKotaPembuatan] = useState("");
  const [kotaPenerima, setKotaPenerima] = useState("");
  const [namaPenerima, setNamaPenerima] = useState("");

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
    html2canvas(capture).then((canvas) => {
      const date = Date.now();
      const tgl = new Date(date).toLocaleDateString();
      const imgData = canvas.toDataURL("/images/logo/bappenasLogo.png");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save(`undangan_${tgl}.pdf`);
    });
  };

  return (
    <main className="flex gap-10">
      <div>
        <form className="flex flex-col gap-4 mb-10 justify-center">
          <div className="flex flex-col">
            <label>Nomor</label>
            <Input
              placeholder="Nomor Surat"
              onChange={(e) => setNomor(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label>Sifat</label>
            <Input
              placeholder="Sifat"
              onChange={(e) => setSifat(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label>Terlampir</label>
            <Input
              placeholder="Terlampir"
              onChange={(e) => setLampiran(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label>Perihal </label>
            <Input
              placeholder="Perihal"
              onChange={(e) => setHal(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Kota dan Tanggal</label>
            <Input
              placeholder="Kota"
              onChange={(e) => setKotaPembuatan(e.target.value)}
            />
            <Input
              placeholder="Tanggal"
              type="date"
              onChange={(e: any) =>
                setTanggal(
                  e.target.valueAsDate.toLocaleDateString("id-ID", options)
                )
              }
            />
          </div>
          <div className="flex flex-col">
            <label>Nama</label>
            <Input
              placeholder="Nama"
              onChange={(e) => setNamaPenerima(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label>Kota</label>
            <Input
              placeholder="Kota"
              onChange={(e) => setKotaPenerima(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label>Isi</label>
            <ReactQuill
              className="w-96 bg-white"
              modules={myModule}
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </div>
        </form>
        <Button
          className="text-white my-4"
          onClick={handleDownload}
          disabled={!(loader === false)}
        >
          {loader ? <span>Downloading</span> : <span>Download</span>}
        </Button>
      </div>
      <div className="receipt-pdf">
        <TemplateUndangan
          no={nomor}
          isi={value}
          tanggal={tanggal}
          kotaPembuatan={kotaPembuatan}
          sifat={sifat}
          lampiran={lampiran}
          hal={hal}
          nama={namaPenerima}
          kotaPenerima={kotaPenerima}
        />
      </div>
    </main>
  );
};

export default SuratTugas;
