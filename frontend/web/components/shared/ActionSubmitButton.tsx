"use client";

import React from "react";
import { Button } from "../ui/button";
import spinner from "@/public/images/spinner.svg";
import { useFormStatus } from "react-dom";
import Image from "next/image";

interface Props {
  label: string;
}
function SubmitButton({ label }: Props) {
  const { pending } = useFormStatus();
  return (
    <>
      <Button disabled={pending} type="submit" className="px-10 w-full max-w-md mt-10">
        <div className="flex items-center justify-center gap-2">
          <p> {pending ? "SUBMITTING" : label}</p>
          <Image
            src={spinner}
            className={pending ? "h-4 w-4 animate-spin text-white" : "hidden"}
            alt="spinner"
          />
        </div>
      </Button>
    </>
  );
}

export default SubmitButton;
