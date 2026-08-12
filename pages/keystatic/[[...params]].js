import { makePage } from "@keystatic/next/ui/pages";
import keystaticConfig from "../../keystatic.config";

export default makePage(keystaticConfig);

// Prevent static pre-rendering — Keystatic Admin must be SSR only
export function getServerSideProps() {
  return { props: {} };
}

