export function getServerSideProps() {
  return {
    redirect: {
      destination: "/keystatic",
      permanent: false,
    },
  };
}

export default function Admin() {
  return null;
}
