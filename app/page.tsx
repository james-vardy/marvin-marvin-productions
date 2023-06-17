import Image from "next/image";

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
  const selectedWorks: selectedWorksPopulated = await getSelectedWorks();

  return (
    <main>
      <div className="flex flex-wrap justify-center">
        {selectedWorks.data.map((selectedWork, key) => (
          <div className="flex flex-col justify-center" key={key}>
            <div className="relative h-80 w-80">
              <a href={selectedWork.attributes.streamingLink} target="_blank">
                <Image
                  src={`https://edit.marvinmarvinproductions.com${selectedWork.attributes.coverImage.data.attributes.url}`}
                  fill={true}
                  style={{ objectFit: "contain" }}
                  className="px-2"
                  alt={
                    selectedWork.attributes.coverImage.data.attributes
                      .alternativeText
                  }
                ></Image>
              </a>
            </div>

            <p className="self-center text-xs mb-4">
              {selectedWork.attributes.evanRole ?? "Add credits x"}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
