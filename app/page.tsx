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
    "https://edit.marvinmarvinproductions.com/api/selected-works?populate=*&sort=releaseDate:desc"
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
          <div className="relative h-80 w-80" key={key}>
            <a href={selectedWork.attributes.streamingLink} target="_blank">
              <Image
                src={`https://edit.marvinmarvinproductions.com${selectedWork.attributes.coverImage.data.attributes.url}`}
                fill={true}
                style={{ objectFit: "contain" }}
                className="px-2 py-2"
                alt={
                  selectedWork.attributes.coverImage.data.attributes
                    .alternativeText
                }
              ></Image>
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
