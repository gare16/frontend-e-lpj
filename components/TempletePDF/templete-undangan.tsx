import Image from "next/image";
import React from "react";
import "./bookman.css";

const TemplateUndangan = ({
  no,
  isi,
  tanggal,
  kotaPembuatan,
  sifat,
  lampiran,
  hal,
  nama,
  kotaPenerima,
}: any) => {
  return (
    <main className="font-bookman bg-white inset-0 border text-black w-[794px] h-[1122px] flex flex-col px-20">
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
          <main className="w-full flex justify-between">
            <figure className="w-1/2 mt-5 flex flex-col text-md">
              <p>
                Nomor&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;{no}
              </p>
              <p>
                Sifat&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                : &nbsp;{sifat}
              </p>
              <p>Lampiran&nbsp;&nbsp;&nbsp; : &nbsp;{lampiran}</p>
              <p>
                Hal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                : &nbsp;{hal}
              </p>
            </figure>
            <figure className="w-1/2 mt-5 text-md text-end">
              <p>
                {kotaPembuatan}, {tanggal}
              </p>
            </figure>
          </main>
          <article className="text-wrap my-8">
            <p>Yth. {nama}</p>
            <p>
              di <span>{kotaPenerima}</span>
            </p>
            <p className="indent-12 text-justify max-w-2xl my-8 ">
              <span dangerouslySetInnerHTML={{ __html: isi }} />
            </p>
          </article>
        </div>
      </header>
    </main>
  );
};

export default TemplateUndangan;
