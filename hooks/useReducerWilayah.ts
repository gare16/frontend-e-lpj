export type AddressW = {
  province: string;
  daerah: string;
  kecamatan: string;
  kelurahan: string;
};

type Action = {
  type: "ADD_PROVINCE" | "ADD_DAERAH" | "ADD_KECAMATAN" | "ADD_KELURAHAN";
  payload: AddressW;
};

export const reducerWilayah = (state: AddressW, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_PROVINCE": {
      return {
        ...state,
        province: payload.province,
      };
    }
    case "ADD_DAERAH": {
      return {
        ...state,
        daerah: payload.daerah,
      };
    }
    case "ADD_KECAMATAN": {
      return {
        ...state,
        kecamatan: payload.kecamatan,
      };
    }
    case "ADD_KELURAHAN": {
      return {
        ...state,
        kelurahan: payload.kelurahan,
      };
    }
    default:
      return state;
  }
};
