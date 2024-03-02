export type Address = {
  url: string;
};

type Action = {
  type: "ADD_PROVINSI" | "ADD_DAERAH" | "ADD_KECAMATAN" | "ADD_KELURAHAN";
  payload: Address;
};

export const reducer = (state: Address, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_DAERAH": {
      return {
        ...state,
        url: payload.url,
      };
    }
    default:
      return state;
  }
};
