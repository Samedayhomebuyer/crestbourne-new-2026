"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/icons";
import ContactDrawer from "@/components/ContactDrawer";

export default function EnquireButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="default" className="w-full justify-between" onClick={() => setOpen(true)}>
        Enquire about this deal <ArrowIcon className="w-[14px] h-[14px]" />
      </Button>
      {createPortal(
        <ContactDrawer open={open} onClose={() => setOpen(false)} />,
        document.body
      )}
    </>
  );
}
