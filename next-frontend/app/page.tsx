import Image from "next/image";

async function getProfessionalDetails() {
  const res = await fetch(
    "https://edit.marvinmarvinproductions.com/api/professional-detail?populate=*"
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getSelectedWorks() {
  const res = await fetch(
    "https://edit.marvinmarvinproductions.com/api/selected-works?populate=*"
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const professionalDetails: professionalDetails =
    await getProfessionalDetails();

  const selectedWorks: selectedWorksPopulated = await getSelectedWorks();

  return (
    <main className="">
      <div className="flex flex-wrap justify-center">
        {selectedWorks.data.map((selectedWork, key) => (
          <a
            href={selectedWork.attributes.streamingLink}
            target="_blank"
            key={key}
          >
            <Image
              src={`https://edit.marvinmarvinproductions.com${selectedWork.attributes.coverImage.data.attributes.formats.small.url}`}
              height={300}
              width={300}
              className="px-2 py-2"
              alt={
                selectedWork.attributes.coverImage.data.attributes
                  .alternativeText
              }
            ></Image>
          </a>
        ))}
      </div>
    </main>
  );
}
