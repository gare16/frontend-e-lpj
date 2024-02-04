import React from "react";

const FooterChecking = () => {
  return (
    <>
      <h3 className="mt-5 ">
        *Penyampaian dokumen paling lambat 5 hari kerja setelah kegiatan
        dilaksanakan
      </h3>
      <div className="w-full h-48 flex gap-2 mt-5">
        <div className="w-1/2 flex flex-col justify-between gap-20 font-bold">
          <h2>Yang Mengajukan,</h2>
          <h2>Nama: </h2>
        </div>
        <div className="w-1/2 flex justify-end gap-20 font-bold">
          <div className="flex flex-col justify-between me-10">
            <h2>Verifikator Sekretariat PPK</h2>
            <h2>Nama: </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterChecking;
