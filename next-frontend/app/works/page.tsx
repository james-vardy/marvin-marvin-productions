async function getSelectedWorks() {
  const res = await fetch(
    "http://localhost:1337/api/selected-works?populate=*"
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const selectedWorks: selectedWorks = await getSelectedWorks();
  return <main></main>;
}
