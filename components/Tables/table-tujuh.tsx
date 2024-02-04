"use client";
import {
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { getApi } from "@/lib/api";
import { ToastContainer } from "react-toastify";
import { DokumenPendukung, HeaderTable } from "../datas/data-checking";
import { useParams } from "next/navigation";
import {
  BelanjaBahan,
  BelanjaSewa,
  HonorNarasumber,
  JasaKonsultan,
  KonsumsiRapat,
  PDBiasa,
  PDDalamKota,
  PDLuarNegeri,
  PDPMeetingDalamKota,
  PDPMeetingLuarKota,
  PembelianBarang,
} from "../datas/data-checking-box";
import { useLayoutEffect, useState } from "react";
import DialogUpdateChecking from "../Dialogs/DialogUpdateChecking";
import DialogUpdateStatus from "../Dialogs/DialogStatus";
import DialogRalatAdmin from "../Dialogs/admin/DialogRalat";
import DialogRalatUser from "../Dialogs/user/DialogRalat";
import { Tooltip as ReactTooltip } from "react-tooltip";
import FooterChecking from "../pageSurat/footer";

type Props = {
  name: string;
  col_1: string;
  col_2: string;
  col_3: string;
  col_4: string;
  col_5: string;
  col_6: string;
  col_7: string;
  col_8: string;
  col_9: string;
  col_10: string;
  col_11: string;
};

const TablePerjalananDalamKota = () => {
  const [datas, setDatas] = useState<Props[]>([]);
  const user = localStorage.getItem("role");
  const id = useParams();
  const dokPendukung = DokumenPendukung.map((e) => {
    return e.dpIndex;
  });
  const headerTable = HeaderTable;
  const konsumsiRapat: any = KonsumsiRapat;
  const belanjaBahan: any = BelanjaBahan;
  const belanjaSewa: any = BelanjaSewa;
  const honorNarasumber: any = HonorNarasumber;
  const jasaKonsultan: any = JasaKonsultan;
  const biasa: any = PDBiasa;
  const dalamKota: any = PDDalamKota;
  const meetingDalamKota: any = PDPMeetingDalamKota;
  const meetingLuarKota: any = PDPMeetingLuarKota;
  const luarnegeri: any = PDLuarNegeri;
  const pembelianBarang: any = PembelianBarang;

  const api = async () => {
    const laporan = await getApi(`/checking/${id.id}`, "");

    // konsumsi rapat
    let temp_1 = null;
    temp_1 = konsumsiRapat;

    //belanja bahan
    let temp_2 = null;
    temp_2 = belanjaBahan;

    //belanja sewa
    let temp_3 = null;
    temp_3 = belanjaSewa;

    //Honor Narasumber
    let temp_4 = null;
    temp_4 = honorNarasumber;

    //Jasa Konsultan
    let temp_5 = null;
    temp_5 = jasaKonsultan;

    //Dinas Biasa
    let temp_6 = null;
    temp_6 = biasa;

    // Perjalanan Dinas Dalam Kota
    let temp_7 = null;
    temp_7 = laporan?.data?.result;

    //Paket Meeting Dalam Kota
    let temp_8 = null;
    temp_8 = meetingDalamKota;

    //Paket Meeting Luar Kota
    let temp_9 = null;
    temp_9 = meetingLuarKota;

    //Dinas Luar Negeri
    let temp_10 = null;
    temp_10 = luarnegeri;

    //Pembelian Barang
    let temp_11 = null;
    temp_11 = pembelianBarang;

    if (laporan) {
      setDatas([
        {
          name: dokPendukung[0],
          col_1: temp_1?.kode_mak,
          col_2: temp_2?.kode_mak,
          col_3: temp_3?.kode_mak,
          col_4: temp_4?.kode_mak,
          col_5: temp_5?.kode_mak,
          col_6: temp_6?.kode_mak,
          col_7: temp_7?.kode_mak,
          col_8: temp_8?.kode_mak,
          col_9: temp_9?.kode_mak,
          col_10: temp_10?.kode_mak,
          col_11: temp_11?.kode_mak,
        },
        {
          name: dokPendukung[1],
          col_1: temp_1?.kuitansi,
          col_2: temp_2?.kuitansi,
          col_3: temp_3?.kuitansi,
          col_4: temp_4?.kuitansi,
          col_5: temp_5?.kuitansi,
          col_6: temp_6?.kuitansi,
          col_7: temp_7?.kuitansi,
          col_8: temp_8?.kuitansi,
          col_9: temp_9?.kuitansi,
          col_10: temp_10?.kuitansi,
          col_11: temp_11?.kuitansi,
        },
        {
          name: dokPendukung[2],
          col_1: temp_1?.undangan,
          col_2: temp_2?.undangan,
          col_3: temp_3?.undangan,
          col_4: temp_4?.undangan,
          col_5: temp_5?.undangan,
          col_6: temp_6?.undangan,
          col_7: temp_7?.undangan,
          col_8: temp_8?.undangan,
          col_9: temp_9?.undangan,
          col_10: temp_10?.undangan,
          col_11: temp_11?.undangan,
        },
        {
          name: dokPendukung[3],
          col_1: temp_1?.daftar_hadir,
          col_2: temp_2?.daftar_hadir,
          col_3: temp_3?.daftar_hadir,
          col_4: temp_4?.daftar_hadir,
          col_5: temp_5?.daftar_hadir,
          col_6: temp_6?.daftar_hadir,
          col_7: temp_7?.daftar_hadir,
          col_8: temp_8?.daftar_hadir,
          col_9: temp_9?.daftar_hadir,
          col_10: temp_10?.daftar_hadir,
          col_11: temp_11?.daftar_hadir,
        },
        {
          name: dokPendukung[4],
          col_1: temp_1?.notulensi,
          col_2: temp_2?.notulensi,
          col_3: temp_3?.notulensi,
          col_4: temp_4?.notulensi,
          col_5: temp_5?.notulensi,
          col_6: temp_6?.notulensi,
          col_7: temp_7?.notulensi,
          col_8: temp_8?.notulensi,
          col_9: temp_9?.notulensi,
          col_10: temp_10?.notulensi,
          col_11: temp_11?.notulensi,
        },
        {
          name: dokPendukung[5],
          col_1: temp_1?.dokumentasi,
          col_2: temp_2?.dokumentasi,
          col_3: temp_3?.dokumentasi,
          col_4: temp_4?.dokumentasi,
          col_5: temp_5?.dokumentasi,
          col_6: temp_6?.dokumentasi,
          col_7: temp_7?.dokumentasi,
          col_8: temp_8?.dokumentasi,
          col_9: temp_9?.dokumentasi,
          col_10: temp_10?.dokumentasi,
          col_11: temp_11?.dokumentasi,
        },
        {
          name: dokPendukung[6],
          col_1: temp_1?.paparan,
          col_2: temp_2?.paparan,
          col_3: temp_3?.paparan,
          col_4: temp_4?.paparan,
          col_5: temp_5?.paparan,
          col_6: temp_6?.paparan,
          col_7: temp_7?.paparan,
          col_8: temp_8?.paparan,
          col_9: temp_9?.paparan,
          col_10: temp_10?.paparan,
          col_11: temp_11?.paparan,
        },
        {
          name: dokPendukung[7],
          col_1: temp_1?.rpa,
          col_2: temp_2?.rpa,
          col_3: temp_3?.rpa,
          col_4: temp_4?.rpa,
          col_5: temp_5?.rpa,
          col_6: temp_6?.rpa,
          col_7: temp_7?.rpa,
          col_8: temp_8?.rpa,
          col_9: temp_9?.rpa,
          col_10: temp_10?.rpa,
          col_11: temp_11?.rpa,
        },
        {
          name: dokPendukung[8],
          col_1: temp_1?.surat_tugas,
          col_2: temp_2?.surat_tugas,
          col_3: temp_3?.surat_tugas,
          col_4: temp_4?.surat_tugas,
          col_5: temp_5?.surat_tugas,
          col_6: temp_6?.surat_tugas,
          col_7: temp_7?.surat_tugas,
          col_8: temp_8?.surat_tugas,
          col_9: temp_9?.surat_tugas,
          col_10: temp_10?.surat_tugas,
          col_11: temp_11?.surat_tugas,
        },
        {
          name: dokPendukung[9],
          col_1: temp_1?.spd,
          col_2: temp_2?.spd,
          col_3: temp_3?.spd,
          col_4: temp_4?.spd,
          col_5: temp_5?.spd,
          col_6: temp_6?.spd,
          col_7: temp_7?.spd,
          col_8: temp_8?.spd,
          col_9: temp_9?.spd,
          col_10: temp_10?.spd,
          col_11: temp_11?.spd,
        },
        {
          name: dokPendukung[10],
          col_1: temp_1?.sppd,
          col_2: temp_2?.sppd,
          col_3: temp_3?.sppd,
          col_4: temp_4?.sppd,
          col_5: temp_5?.sppd,
          col_6: temp_6?.sppd,
          col_7: temp_7?.sppd,
          col_8: temp_8?.sppd,
          col_9: temp_9?.sppd,
          col_10: temp_10?.sppd,
          col_11: temp_11?.sppd,
        },
        {
          name: dokPendukung[11],
          col_1: temp_1?.sp_pengeluaran,
          col_2: temp_2?.sp_pengeluaran,
          col_3: temp_3?.sp_pengeluaran,
          col_4: temp_4?.sp_pengeluaran,
          col_5: temp_5?.sp_pengeluaran,
          col_6: temp_6?.sp_pengeluaran,
          col_7: temp_7?.sp_pengeluaran,
          col_8: temp_8?.sp_pengeluaran,
          col_9: temp_9?.sp_pengeluaran,
          col_10: temp_10?.sp_pengeluaran,
          col_11: temp_11?.sp_pengeluaran,
        },
        {
          name: dokPendukung[12],
          col_1: temp_1?.sptj_mutlak,
          col_2: temp_2?.sptj_mutlak,
          col_3: temp_3?.sptj_mutlak,
          col_4: temp_4?.sptj_mutlak,
          col_5: temp_5?.sptj_mutlak,
          col_6: temp_6?.sptj_mutlak,
          col_7: temp_7?.sptj_mutlak,
          col_8: temp_8?.sptj_mutlak,
          col_9: temp_9?.sptj_mutlak,
          col_10: temp_10?.sptj_mutlak,
          col_11: temp_11?.sptj_mutlak,
        },
        {
          name: dokPendukung[13],
          col_1: temp_1?.copy_personal,
          col_2: temp_2?.copy_personal,
          col_3: temp_3?.copy_personal,
          col_4: temp_4?.copy_personal,
          col_5: temp_5?.copy_personal,
          col_6: temp_6?.copy_personal,
          col_7: temp_7?.copy_personal,
          col_8: temp_8?.copy_personal,
          col_9: temp_9?.copy_personal,
          col_10: temp_10?.copy_personal,
          col_11: temp_11?.copy_personal,
        },
        {
          name: dokPendukung[14],
          col_1: temp_1?.boarding_pass,
          col_2: temp_2?.boarding_pass,
          col_3: temp_3?.boarding_pass,
          col_4: temp_4?.boarding_pass,
          col_5: temp_5?.boarding_pass,
          col_6: temp_6?.boarding_pass,
          col_7: temp_7?.boarding_pass,
          col_8: temp_8?.boarding_pass,
          col_9: temp_9?.boarding_pass,
          col_10: temp_10?.boarding_pass,
          col_11: temp_11?.boarding_pass,
        },
        {
          name: dokPendukung[15],
          col_1: temp_1?.kwitansi_hotel,
          col_2: temp_2?.kwitansi_hotel,
          col_3: temp_3?.kwitansi_hotel,
          col_4: temp_4?.kwitansi_hotel,
          col_5: temp_5?.kwitansi_hotel,
          col_6: temp_6?.kwitansi_hotel,
          col_7: temp_7?.kwitansi_hotel,
          col_8: temp_8?.kwitansi_hotel,
          col_9: temp_9?.kwitansi_hotel,
          col_10: temp_10?.kwitansi_hotel,
          col_11: temp_11?.kwitansi_hotel,
        },
        {
          name: dokPendukung[16],
          col_1: temp_1?.form_ppd,
          col_2: temp_2?.form_ppd,
          col_3: temp_3?.form_ppd,
          col_4: temp_4?.form_ppd,
          col_5: temp_5?.form_ppd,
          col_6: temp_6?.form_ppd,
          col_7: temp_7?.form_ppd,
          col_8: temp_8?.form_ppd,
          col_9: temp_9?.form_ppd,
          col_10: temp_10?.form_ppd,
          col_11: temp_11?.form_ppd,
        },
        {
          name: dokPendukung[17],
          col_1: temp_1?.copy_paspor,
          col_2: temp_2?.copy_paspor,
          col_3: temp_3?.copy_paspor,
          col_4: temp_4?.copy_paspor,
          col_5: temp_5?.copy_paspor,
          col_6: temp_6?.copy_paspor,
          col_7: temp_7?.copy_paspor,
          col_8: temp_8?.copy_paspor,
          col_9: temp_9?.copy_paspor,
          col_10: temp_10?.copy_paspor,
          col_11: temp_11?.copy_paspor,
        },
        {
          name: dokPendukung[18],
          col_1: temp_1?.copy_spk,
          col_2: temp_2?.copy_spk,
          col_3: temp_3?.copy_spk,
          col_4: temp_4?.copy_spk,
          col_5: temp_5?.copy_spk,
          col_6: temp_6?.copy_spk,
          col_7: temp_7?.copy_spk,
          col_8: temp_8?.copy_spk,
          col_9: temp_9?.copy_spk,
          col_10: temp_10?.copy_spk,
          col_11: temp_11?.copy_spk,
        },
        {
          name: dokPendukung[19],
          col_1: temp_1?.ba_serah_terima,
          col_2: temp_2?.ba_serah_terima,
          col_3: temp_3?.ba_serah_terima,
          col_4: temp_4?.ba_serah_terima,
          col_5: temp_5?.ba_serah_terima,
          col_6: temp_6?.ba_serah_terima,
          col_7: temp_7?.ba_serah_terima,
          col_8: temp_8?.ba_serah_terima,
          col_9: temp_9?.ba_serah_terima,
          col_10: temp_10?.ba_serah_terima,
          col_11: temp_11?.ba_serah_terima,
        },
        {
          name: dokPendukung[20],
          col_1: temp_1?.ba_pembayaran,
          col_2: temp_2?.ba_pembayaran,
          col_3: temp_3?.ba_pembayaran,
          col_4: temp_4?.ba_pembayaran,
          col_5: temp_5?.ba_pembayaran,
          col_6: temp_6?.ba_pembayaran,
          col_7: temp_7?.ba_pembayaran,
          col_8: temp_8?.ba_pembayaran,
          col_9: temp_9?.ba_pembayaran,
          col_10: temp_10?.ba_pembayTableJasaKonsultanaran,
          col_11: temp_11?.ba_pembayaran,
        },
        {
          name: dokPendukung[21],
          col_1: temp_1?.faktur_pajak,
          col_2: temp_2?.faktur_pajak,
          col_3: temp_3?.faktur_pajak,
          col_4: temp_4?.faktur_pajak,
          col_5: temp_5?.faktur_pajak,
          col_6: temp_6?.faktur_pajak,
          col_7: temp_7?.faktur_pajak,
          col_8: temp_8?.faktur_pajak,
          col_9: temp_9?.faktur_pajak,
          col_10: temp_10?.faktur_pajak,
          col_11: temp_11?.faktur_pajak,
        },
        {
          name: dokPendukung[22],
          col_1: temp_1?.bp_apbn,
          col_2: temp_2?.bp_apbn,
          col_3: temp_3?.bp_apbn,
          col_4: temp_4?.bp_apbn,
          col_5: temp_5?.bp_apbn,
          col_6: temp_6?.bp_apbn,
          col_7: temp_7?.bp_apbn,
          col_8: temp_8?.bp_apbn,
          col_9: temp_9?.bp_apbn,
          col_10: temp_10?.bp_apbn,
          col_11: temp_11?.bp_apbn,
        },
        {
          name: dokPendukung[23],
          col_1: temp_1?.garansi_bank,
          col_2: temp_2?.garansi_bank,
          col_3: temp_3?.garansi_bank,
          col_4: temp_4?.garansi_bank,
          col_5: temp_5?.garansi_bank,
          col_6: temp_6?.garansi_bank,
          col_7: temp_7?.garansi_bank,
          col_8: temp_8?.garansi_bank,
          col_9: temp_9?.garansi_bank,
          col_10: temp_10?.garansi_bank,
          col_11: temp_11?.garansi_bank,
        },
        {
          name: dokPendukung[24],
          col_1: temp_1?.honor,
          col_2: temp_2?.honor,
          col_3: temp_3?.honor,
          col_4: temp_4?.honor,
          col_5: temp_5?.honor,
          col_6: temp_6?.honor,
          col_7: temp_7?.honor,
          col_8: temp_8?.honor,
          col_9: temp_9?.honor,
          col_10: temp_10?.honor,
          col_11: temp_11?.honor,
        },
      ]);
    }
  };

  const handleOnChange = (e: any, key: any) => {
    let res = [...datas];
    res[key].col_7 = e.target.checked;

    setDatas(res);
  };

  useLayoutEffect(() => {
    api();
  }, []);

  useLayoutEffect(() => {}, [datas]);

  return (
    <>
      <header className="mb-3 flex justify-end gap-4">
        {user === "admin" ? (
          <>
            <div data-tooltip-id="tooltip-1">
              <DialogRalatAdmin id={id} />
            </div>
            <ReactTooltip id="tooltip-1" place="top" content="Ralat" />
          </>
        ) : user === "user" ? (
          <>
            <div data-tooltip-id="tooltip-2">
              <DialogRalatUser props={id} />
            </div>
            <ReactTooltip id="tooltip-2" place="top" content="Ralat" />
          </>
        ) : null}
        <div data-tooltip-id="tooltip-status">
          <DialogUpdateStatus id={id.id} />
        </div>
        <ReactTooltip id="tooltip-status" place="top" content="Status Done" />

        <div data-tooltip-id="tooltip-save">
          <DialogUpdateChecking id={id.id} datas={datas} />
        </div>
        <ReactTooltip id="tooltip-save" place="top" content="Save" />
      </header>
      <Table>
        <TableHeader className="bg-bodydark text-black">
          <TableRow>
            {headerTable.map((header, i) => (
              <TableCell
                className="w-[2px] border border-black md:w-auto"
                key={i}
              >
                <p>{header.dataIndex}</p>
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {datas?.map((item, key) => (
            <TableRow className="text-center" key={key}>
              <TableCell>{item?.name}</TableCell>
              <TableCell className="blur-sm">
                {item?.col_1 !== null ? (
                  typeof item?.col_1 === "boolean" ? (
                    <input
                      type="checkbox"
                      disabled
                      className="form-checkbox h-5 w-5 text-gray-600"
                      defaultChecked={
                        item?.col_1
                        // typeof item?.col_1 === "boolean" &&
                        // item?.col_1 === true
                      }
                    />
                  ) : (
                    item?.col_1
                  )
                ) : (
                  ""
                )}
              </TableCell>
              <TableCell className="blur-sm">
                {item?.col_2 !== null ? (
                  typeof item?.col_2 === "boolean" ? (
                    <input
                      type="checkbox"
                      disabled
                      className="form-checkbox h-5 w-5 text-gray-600"
                      defaultChecked={
                        typeof item?.col_2 === "boolean" && item?.col_2 === true
                      }
                    />
                  ) : (
                    item?.col_2
                  )
                ) : (
                  ""
                )}
              </TableCell>
              <TableCell className="blur-sm">
                {item?.col_3 !== null ? (
                  typeof item?.col_3 === "boolean" ? (
                    <input
                      type="checkbox"
                      disabled
                      className="form-checkbox h-5 w-5 text-gray-600"
                      defaultChecked={
                        typeof item?.col_3 === "boolean" && item?.col_3 === true
                      }
                    />
                  ) : (
                    item?.col_3
                  )
                ) : (
                  ""
                )}
              </TableCell>
              <TableCell className="blur-sm">
                {item?.col_4 !== null ? (
                  typeof item?.col_4 === "boolean" ? (
                    <input
                      type="checkbox"
                      disabled
                      className="form-checkbox h-5 w-5 text-gray-600"
                      defaultChecked={
                        typeof item?.col_4 === "boolean" && item?.col_4 === true
                      }
                    />
                  ) : (
                    item?.col_4
                  )
                ) : (
                  ""
                )}
              </TableCell>
              <TableCell className="blur-sm">
                {item?.col_5 !== null ? (
                  typeof item?.col_5 === "boolean" ? (
                    <input
                      type="checkbox"
                      disabled
                      className="form-checkbox h-5 w-5 text-gray-600"
                      defaultChecked={
                        typeof item?.col_5 === "boolean" && item?.col_5 === true
                      }
                    />
                  ) : (
                    item?.col_5
                  )
                ) : (
                  ""
                )}
              </TableCell>
              <TableCell className="blur-sm">
                {item?.col_6 !== null ? (
                  typeof item?.col_6 === "boolean" ? (
                    <input
                      type="checkbox"
                      disabled
                      className="form-checkbox h-5 w-5 text-gray-600"
                      defaultChecked={
                        typeof item?.col_6 === "boolean" && item?.col_6 === true
                      }
                    />
                  ) : (
                    item?.col_6
                  )
                ) : (
                  ""
                )}
              </TableCell>
              <TableCell>
                {item?.col_7 !== null ? (
                  typeof item?.col_7 === "boolean" ? (
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-gray-600"
                      onChange={(e) => handleOnChange(e, key)}
                      defaultChecked={
                        typeof item?.col_7 === "boolean" && item?.col_7 === true
                      }
                    />
                  ) : (
                    item?.col_7
                  )
                ) : (
                  ""
                )}
              </TableCell>
              <TableCell className="blur-sm">
                {item?.col_8 !== null ? (
                  typeof item?.col_8 === "boolean" ? (
                    <input
                      type="checkbox"
                      disabled
                      className="form-checkbox h-5 w-5 text-gray-600"
                      defaultChecked={
                        typeof item?.col_8 === "boolean" && item?.col_8 === true
                      }
                    />
                  ) : (
                    item?.col_8
                  )
                ) : (
                  ""
                )}
              </TableCell>
              <TableCell className="blur-sm">
                {item?.col_9 !== null ? (
                  typeof item?.col_9 === "boolean" ? (
                    <input
                      type="checkbox"
                      disabled
                      className="form-checkbox h-5 w-5 text-gray-600"
                      defaultChecked={
                        typeof item?.col_9 === "boolean" && item?.col_9 === true
                      }
                    />
                  ) : (
                    item?.col_9
                  )
                ) : (
                  ""
                )}
              </TableCell>
              <TableCell className="blur-sm">
                {item?.col_10 !== null ? (
                  typeof item?.col_10 === "boolean" ? (
                    <input
                      type="checkbox"
                      disabled
                      className="form-checkbox h-5 w-5 text-gray-600"
                      defaultChecked={
                        typeof item?.col_10 === "boolean" &&
                        item?.col_10 === true
                      }
                    />
                  ) : (
                    item?.col_10
                  )
                ) : (
                  ""
                )}
              </TableCell>
              <TableCell className="blur-sm">
                {item?.col_11 !== null ? (
                  typeof item?.col_11 === "boolean" ? (
                    <input
                      type="checkbox"
                      disabled
                      className="form-checkbox h-5 w-5 text-gray-600"
                      defaultChecked={
                        typeof item?.col_11 === "boolean" &&
                        item?.col_11 === true
                      }
                    />
                  ) : (
                    item?.col_11
                  )
                ) : (
                  ""
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <FooterChecking />
      <ToastContainer
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

export default TablePerjalananDalamKota;
