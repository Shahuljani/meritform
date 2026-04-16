import React from "react";
import { useState } from "react";
import Form from "./Form";

export default function EnquiryButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* FLOATING BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-red-500 text-white px-4 py-2 rounded-r-lg shadow-lg z-50"
      >
        ENQUIRY
      </button>

      {/* POPUP FORM */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

          <div className="bg-white p-5 rounded shadow-lg relative w-full max-w-lg">
            
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-red-500 text-lg"
            >
              ✕
            </button>

            <Form />
          </div>

        </div>
      )}
    </>
  );
}