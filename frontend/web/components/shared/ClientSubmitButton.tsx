"use client";

import React from "react";
import { Button } from "../ui/button";
import spinner from "@/public/images/spinner.svg";
import Image from "next/image";

interface Props {
  label: string;
  loading: boolean;
}
function ClientSubmitButton({ label, loading }: Props) {
  return (
    <>
      <Button disabled={loading} type="submit" className="px-10 w-full">
        <div className="flex items-center justify-center gap-2">
          <p> {loading ? "Submitting" : label}</p>
          <Image
            src={spinner}
            className={loading ? "h-4 w-4 animate-spin text-white" : "hidden"}
            alt="spinner"
          />
        </div>
      </Button>
    </>
  );
}

export default ClientSubmitButton;
