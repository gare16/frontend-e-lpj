import React from "react";
import { DialogUploadFiles } from "../Dialogs/DialogUploadFiles";

const CardUpload = (id: any) => {
  return (
    <>
      <div className="w-65 h-75 border border-graydark rounded-md flex flex-col justify-between ps-5">
        <div>
          <svg
            className="w-8 h-8 border border-graydark rounded-md mt-10 mb-3"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          <h2 className="text-3xl font-bold">New Upload</h2>
          <h5 className="text-base font-light">Add New Item</h5>
        </div>
        <div>
          <DialogUploadFiles id={id} />
        </div>
      </div>
    </>
  );
};

export default CardUpload;
