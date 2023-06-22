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
    "https://edit.marvinmarvinproductions.com/api/selected-works?populate=*&sort=releaseDate:desc"
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
        <table className="table-auto border-separate border-spacing-2 border border-slate-400">
          <tbody>
            {selectedWorks.data.map((selectedWork, key) =>
              selectedWork.attributes.highlighted ? (
                <tr key={key}>
                  <td className="border border-slate-300 px-2 py-2">
                    <div className="flex flex-col lg:flex-row">
                      <div className="flex justify-center items-center px-4 py-4 md:px-0 md:py-0">
                        <div className="relative h-40 w-40 lg:h-60 lg:w-60">
                          <Image
                            src={`https://edit.marvinmarvinproductions.com${selectedWork.attributes.coverImage.data.attributes.url}`}
                            fill={true}
                            alt={
                              selectedWork.attributes.coverImage.data.attributes
                                .alternativeText
                            }
                          ></Image>
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col px-2 py-2 mx-5 md:mx-10 text-sm md:text-base lg:text-lg text-center">
                          <a
                            href={selectedWork.attributes.spotifyLink}
                            target="_blank"
                          >
                            <h2>
                              <b>
                                {selectedWork.attributes.trackName} -{" "}
                                {selectedWork.attributes.artistName}
                              </b>
                            </h2>
                          </a>

                          <div className="text-xs">
                            <h3>
                              <i>
                                Released: {selectedWork.attributes.releaseDate}
                              </i>
                            </h3>
                          </div>

                          <div className="mt-2">
                            <p>
                              {selectedWork.attributes.description ??
                                "example description"}
                            </p>
                          </div>

                          <div className="flex md:hidden flex-row justify-center px-2 py-2 text-center">
                            <a
                              className="px-2 py-2"
                              href={selectedWork.attributes.spotifyLink}
                              target="_blank"
                            >
                              <FontAwesomeIcon
                                icon={faSpotify}
                              ></FontAwesomeIcon>
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
                              <FontAwesomeIcon
                                icon={faYoutube}
                              ></FontAwesomeIcon>
                            </a>
                            <a
                              className="px-2 py-2"
                              href={selectedWork.attributes.soundCloudLink}
                              target="_blank"
                            >
                              <FontAwesomeIcon
                                icon={faSoundcloud}
                              ></FontAwesomeIcon>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell border border-slate-300 px-2 py-2">
                    <div className="flex flex-col justify text-center">
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
              ) : (
                <></>
              )
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
