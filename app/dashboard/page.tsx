"use client";

import dynamic from "next/dynamic";
import React from "react";
const ECommerce = dynamic(() => import("@/components/Dashboard/E-commerce"));

const Page = () => {
  return (
    <>
      <ECommerce />
    </>
  );
};

export default Page;
