import {
  faSpotify,
  faApple,
  faYoutube,
  faSoundcloud,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Image from "next/image";

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

export default async function Works() {
  const selectedWorks: selectedWorksPopulated = await getSelectedWorks();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <table className="table-auto border-separate border-spacing-2 border border-slate-400 px-2 py-2">
          {/* <thead>
            <tr>
              <th className="border border-slate-300 px-2 py-2">Song</th>
              <th className="border border-slate-300 px-2 py-2">Artist</th>
              <th className="border border-slate-300 px-2 py-2">
                Release Date
              </th>
              <th className="border border-slate-300 px-2 py-2">
                Streaming Link
              </th>
            </tr>
          </thead> */}
          <tbody>
            {selectedWorks.data.map((selectedWork, key) => (
              <tr key={key}>
                <td className="border border-slate-300 px-2 py-2">
                  <div className="flex">
                    <Image
                      src={`http://localhost:1337${selectedWork.attributes.coverImage.data.attributes.formats.small.url}`}
                      height={100}
                      width={100}
                      alt={
                        selectedWork.attributes.coverImage.data.attributes
                          .alternativeText
                      }
                    ></Image>
                    <div className="flex flex-col px-2 py-2 align-middle justify-center text-center">
                      {" "}
                      {selectedWork.attributes.trackName}
                      <a
                        href={selectedWork.attributes.spotifyLink}
                        target="_blank"
                      >
                        {" "}
                        {selectedWork.attributes.artistName}{" "}
                      </a>
                      {selectedWork.attributes.releaseDate}{" "}
                    </div>
                  </div>
                </td>
                <td className="border border-slate-300 px-2 py-2">
                  <div className="flex flex-row justify-evenly">
                    <a
                      className="px-2 py-2"
                      href={selectedWork.attributes.spotifyLink}
                      target="_blank"
                    >
                      <FontAwesomeIcon icon={faSpotify}></FontAwesomeIcon>
                    </a>
                    <a
                      className="px-2 py-2"
                      href={selectedWork.attributes.appleMusicLink}
                      target="_blank"
                    >
                      <FontAwesomeIcon icon={faApple}></FontAwesomeIcon>
                    </a>
                    <a
                      className="px-2 py-2"
                      href={selectedWork.attributes.youtubeLink}
                      target="_blank"
                    >
                      <FontAwesomeIcon icon={faYoutube}></FontAwesomeIcon>
                    </a>
                    <a
                      className="px-2 py-2"
                      href={selectedWork.attributes.soundCloudLink}
                      target="_blank"
                    >
                      <FontAwesomeIcon icon={faSoundcloud}></FontAwesomeIcon>
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
