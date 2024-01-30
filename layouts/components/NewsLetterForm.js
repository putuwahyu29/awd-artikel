import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";

function CustomForm({ status, message, onValidated }) {
  let email;

  const submit = () => {
    email &&
      email.value.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email.value,
      });
  };

  return (
    <>
      <div className="pb-2 pt-6">
        <fieldset className="relative">
          <input
            className="newsletter-input form-input h-12 w-full rounded-3xl border-none bg-theme-light px-5 py-3 pr-12 text-dark placeholder:text-xs dark:bg-darkmode-theme-dark"
            type="email"
            placeholder="Alamat Email"
            ref={(node) => (email = node)}
          />
          <FaEnvelope className="absolute right-5 top-1/2 -translate-y-1/2 text-xl transition duration-75" />
        </fieldset>
        <button
          className="d-block btn btn-primary mt-4 w-full"
          onClick={submit}
        >
          Berlangganan
        </button>
      </div>
      {status === "sending" && (
        <div className="mt-2 text-primary">Mohon Tunggu...</div>
      )}
      {status === "error" && (
        <div
          className="mt-2 text-red-700"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div className="mt-2 text-green-700">
          Berhasil, Anda telah berlangganan !
        </div>
      )}
    </>
  );
}

export default CustomForm;
