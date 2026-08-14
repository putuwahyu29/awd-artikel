import React from "react";
import NotFound from "@layouts/404";
import Base from "@layouts/Baseof";
import { getRegularPage } from "@lib/contentParser";

export default async function NotFoundPage() {
  const notFoundData = await getRegularPage("404");
  return (
    <Base title="Halaman Tidak Ditemukan">
      <NotFound data={notFoundData} />
    </Base>
  );
}
