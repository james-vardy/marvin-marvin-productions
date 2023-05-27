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
    <main>
      <div className="flex justify-center">
        <table className="table-auto border-separate border-spacing-2 border border-slate-400 px-2 py-2">
          <tbody>
            {selectedWorks.data.map((selectedWork, key) => (
              <tr key={key}>
                <td className="border border-slate-300 px-2 py-2">
                  <div className="flex items-center">
                    <Image
                      src={`http://localhost:1337${selectedWork.attributes.coverImage.data.attributes.formats.small.url}`}
                      height={200}
                      width={200}
                      alt={
                        selectedWork.attributes.coverImage.data.attributes
                          .alternativeText
                      }
                    ></Image>
                    <div className="flex flex-col px-2 py-2 align-middle justify-center text-center lg:flex-row">
                      <div className="lg:px-2">
                        <p className="text-lg">
                          {selectedWork.attributes.trackName}
                        </p>
                      </div>
                      <a
                        className="lg:px-2"
                        href={selectedWork.attributes.spotifyLink}
                        target="_blank"
                      >
                        <p className="text-lg">
                          {selectedWork.attributes.artistName}
                        </p>
                      </a>

                      <div className="lg:px-2">
                        <p className="text-lg">
                          {selectedWork.attributes.releaseDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </td>
                {/* <td className="hidden border border-slate-300 px-2 py-2 md:flex">
                  <audio
                    controls
                    src={`http://localhost:1337${selectedWork.attributes.trackFile.data.attributes.url}`}
                  >
                    <a
                      href={`http://localhost:1337${selectedWork.attributes.trackFile.data.attributes.url}`}
                    >
                      Download audio
                    </a>
                  </audio>
                </td> */}
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
