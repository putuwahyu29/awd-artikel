import { makePage } from "@keystatic/next/ui/pages";
import Head from "next/head";
import keystaticConfig from "../../keystatic.config";

const KeystaticPage = makePage(keystaticConfig);

export default function Page(props) {
  return (
    <>
      <Head>
        <title>Awd Artikel - Keystatic CMS</title>
        <link rel="icon" href="/images/favicon.png" />
      </Head>
      <KeystaticPage {...props} />
    </>
  );
}

// Prevent static pre-rendering — Keystatic Admin must be SSR only
export function getServerSideProps() {
  return { props: {} };
}
