"use client";
import {
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";
import Select from "react-select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { postData } from "@/lib/api";

const options = [
  { label: "Surat Tugas", value: "Surat Tugas" },
  { label: "Undangan", value: "Undangan" },
];

export function DialogAddSurat() {
  const [file, setFile] = useState<File | undefined>();
  const [textView, setTextView] = useState("Drag or Click to select the file");
  const [deskripsi, setDeskripsi] = useState<string>("");
  const [keterangan, setKeterangan] = useState("");

  const onDrop = useCallback((acceptedFiles: any) => {
    setFile(acceptedFiles[0]);
    setTextView(acceptedFiles[0]?.name);
  }, []);

  const { isDragActive, getRootProps, getInputProps, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "text/plain": [".pdf"],
        "application/pdf": [".pdf"],
      },
    });

  const handleAdd = async () => {
    try {
      const post = await postData(
        `/upload-surat`,
        {
          file,
          deskripsi,
          keterangan,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      window.location.reload();
    } catch (error: any) {}
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-26 text-center py-2 bg-blue text-white rounded-md  border border-graydark">
          Upload Draft
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader className="items-center">
          <DialogTitle>Add Draft</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label className="text-left">Upload File </Label>
            <div className="flex gap-2">
              <div
                {...getRootProps()}
                className="w-full h-28 border flex flex-col items-center justify-center gap-2 rounded-md"
              >
                <input {...getInputProps()} />
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.81825 1.18188C7.64251 1.00615 7.35759 1.00615 7.18185 1.18188L4.18185 4.18188C4.00611 4.35762 4.00611 4.64254 4.18185 4.81828C4.35759 4.99401 4.64251 4.99401 4.81825 4.81828L7.05005 2.58648V9.49996C7.05005 9.74849 7.25152 9.94996 7.50005 9.94996C7.74858 9.94996 7.95005 9.74849 7.95005 9.49996V2.58648L10.1819 4.81828C10.3576 4.99401 10.6425 4.99401 10.8182 4.81828C10.994 4.64254 10.994 4.35762 10.8182 4.18188L7.81825 1.18188ZM2.5 9.99997C2.77614 9.99997 3 10.2238 3 10.5V12C3 12.5538 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2238 12.2239 9.99997 12.5 9.99997C12.7761 9.99997 13 10.2238 13 10.5V12C13 13.104 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2238 2.22386 9.99997 2.5 9.99997Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                {!isDragActive && textView}
                {isDragActive && !isDragReject && "Drop it like it's hot!"}
                {isDragReject && "File type not accepted, sorry!"}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Label className="text-left">Deskripsi</Label>
            <Input
              placeholder="Masukan Deskripsi"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setDeskripsi(e.currentTarget.value)
              }
            />
          </div>

          <div className="flex flex-col gap-4">
            <Label className="text-left">Keterangan</Label>
            <Select
              options={options}
              className="border border-input rounded"
              getOptionValue={(option: any) => {
                return option.value;
              }}
              onChange={(e) => {
                setKeterangan(e.value);
              }}
            />
          </div>
        </div>
        <DialogFooter className="">
          <DialogTrigger asChild>
            <button
              disabled={!file || !deskripsi || !keterangan}
              className="px-4 py-2 bg-blue text-white rounded-md"
              type="submit"
              onClick={handleAdd}
            >
              Submit
            </button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
