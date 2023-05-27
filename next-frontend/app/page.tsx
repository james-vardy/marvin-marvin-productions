import Image from "next/image";

async function getProfessionalDetails() {
  const res = await fetch(
    "http://localhost:1337/api/professional-detail?populate=*"
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

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

export default async function Home() {
  const professionalDetails: professionalDetails =
    await getProfessionalDetails();

  const selectedWorks: selectedWorksPopulated = await getSelectedWorks();

  return (
    <main>
      <div className="flex flex-wrap justify-center px-4 ml-8 mr-8 transition-all">
        {selectedWorks.data.map((selectedWork, key) => (
          <a href={selectedWork.attributes.streamingLink} target="_blank">
            <Image
              key={key}
              src={`http://localhost:1337${selectedWork.attributes.coverImage.data.attributes.formats.small.url}`}
              height={400}
              width={400}
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
