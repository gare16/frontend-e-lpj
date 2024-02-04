import Image from "next/image";
import React from "react";
import "./bookman.css";

const TemplateST = ({ no, isi, tanggal, kota, jabatan, nama }: any) => {
  return (
    <main className="font-bookman inset-0 border text-black w-[794px] h-[1122px] flex flex-col px-20 bg-white overflow-hidden">
      <header className="">
        <div className="border-b-2 flex justify-center h-50 gap-4">
          <div className="grid items-center">
            <Image
              src={"/images/logo/bappenasLogo.png"}
              width={100}
              height={80}
              alt="Bappenas Logo"
              className="items-center"
            />
          </div>
          <div className="flex flex-col justify-center text-center">
            <h2 className="capitalize font-bold w-96">
              Kementerian perencanaan pembangunan nasional/ badan perencanaan
              pembangunan nasional republik indonesia
            </h2>
            <h2 className="capitalize w-96">
              jalan taman suropati nomor 2 jakarta 10310 telepon (021) 31936207,
              3905650; faksimile (021) 3145374
            </h2>
            <p className="">www.bappenas.go.id</p>
          </div>
        </div>
        <div>
          <main className="mx-12">
            <figure className="mt-5 flex flex-col justify-center text-center text-sm">
              <h1 className="">SURAT TUGAS</h1>
              <p className="">NOMOR {no}</p>
            </figure>
          </main>
          <article className="text-wrap flex my-8">
            <p className="indent-12 text-justify max-w-2xl my-8 ">
              <span dangerouslySetInnerHTML={{ __html: isi }} />
            </p>
          </article>
        </div>
      </header>
      <footer className="flex justify-end">
        <main className="w-2/5 flex flex-col gap-20 h-20">
          <div className="flex flex-col">
            <p className="capitalize">
              {kota}, {tanggal}
            </p>
            <p className="text-justify">{jabatan}</p>
          </div>
          <p>{nama}</p>
        </main>
      </footer>
    </main>
  );
};

export default TemplateST;
