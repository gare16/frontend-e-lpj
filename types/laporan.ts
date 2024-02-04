export interface resultLaporan {
  isChecked: boolean;
  id: number;
  authorName: string;
  verifikatorName: string;
  tanggal_pengajuan: Date;
  tanggal_selesai: Date;
  deskripsi: string;
  kode_mak: number;
  nilai_lpj: number;
  tipe: string;
  tipe_deskripsi: string;
  status: string;
}

export interface specifikLaporan {
  verifikatorName: string;
  tanggal_pengajuan: Date;
  tanggal_selesai: Date;
  deskripsi: string;
  kode_mak: number;
  nilai_lpj: number;
  tipe: string;
}

export interface idType {
  id: number;
}

export interface Surat {
  id: number;
  deskripsi: string;
  keterangan: string;
  tipe: string;
}
