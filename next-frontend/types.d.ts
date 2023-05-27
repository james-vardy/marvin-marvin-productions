type selectedWorks = {
  data: [
    {
      id: number;
      attributes: {
        trackName: string;
        releaseDate: string;
        artistName: string;
        createdAt: Date;
        updatedAt: Date;
        publishedAt: Date;
        locale: string;
        streamingLink: string;
        highlighted: boolean;
        spotifyLink: string;
        appleMusicLink: string;
        youtubeLink: string;
        soundCloudLink: string;
        tidalLink: string;
      };
    }
  ];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

type selectedWorksPopulated = {
  data: [
    {
      id: number;
      attributes: {
        trackName: string;
        releaseDate: string;
        artistName: string;
        createdAt: Date;
        updatedAt: Date;
        publishedAt: Date;
        locale: string;
        streamingLink: string;
        highlighted: false;
        spotifyLink: string;
        appleMusicLink: string;
        youtubeLink: string;
        soundCloudLink: string;
        tidalLink: string;
        coverImage: {
          data: {
            id: number;
            attributes: {
              name: string;
              alternativeText: string;
              caption: string;
              width: number;
              height: number;
              formats: {
                thumbnail: {
                  name: string;
                  hash: string;
                  ext: string;
                  mime: string;
                  path: string;
                  width: number;
                  height: number;
                  size: number;
                  url: string;
                };
                small: {
                  name: string;
                  hash: string;
                  ext: string;
                  mime: string;
                  path: string;
                  width: number;
                  height: number;
                  size: number;
                  url: string;
                };
                medium: {
                  name: string;
                  hash: string;
                  ext: string;
                  mime: string;
                  path: string;
                  width: number;
                  height: number;
                  size: number;
                  url: string;
                };
                large: {
                  name: string;
                  hash: string;
                  ext: string;
                  mime: string;
                  path: string;
                  width: number;
                  height: number;
                  size: number;
                  url: string;
                };
              };
              hash: string;
              ext: string;
              mime: string;
              size: number;
              url: string;
              previewUrl: string;
              provider: string;
              provider_metadata: string;
              createdAt: Date;
              updatedAt: Date;
            };
          };
        };
        trackFile: {
          data: {
            id: number;
            attributes: {
              name: string;
              alternativeText: string;
              caption: string;
              ext: string;
              url: string;
              createdAt: Date;
              updatedAt: Date;
            };
          };
        };
        localizations: { data: [] };
      };
    }
  ];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

type professionalDetails = {
  data: {
    id: number;
    attributes: {
      name: string;
      bio: string;
      instagramLink: string;
      emailAddress: string;
      phoneNumber: number;
      createdAt: Date;
      updatedAt: Date;
      publishedAt: Date;
      portrait: {
        data: {
          id: number;
          attributes: {
            name: string;
            alternativeText: string;
            caption: string;
            width: number;
            height: number;
            formats: {
              thumbnail: {
                name: string;
                hash: string;
                ext: string;
                mime: string;
                width: number;
                height: number;
                size: number;
                url: string;
              };
              medium: {
                name: string;
                hash: string;
                ext: string;
                mime: string;
                width: number;
                height: number;
                size: number;
                url: string;
              };
              small: {
                name: string;
                hash: string;
                ext: string;
                mime: string;
                width: number;
                height: number;
                size: number;
                url: string;
              };
              large: {
                name: string;
                hash: string;
                ext: string;
                mime: string;
                width: number;
                height: number;
                size: number;
                url: string;
              };
            };
            hash: string;
            ext: string;
            mime: string;
            size: number;
            url: string;
            previewUrl: string;
            provider: string;
            createdAt: Date;
            updatedAt: Date;
          };
        };
      };
      homePagePictures: {
        data: [
          {
            id: number;
            attributes: {
              name: string;
              alternativeText: string;
              caption: string;
              width: number;
              height: number;
              formats: {
                thumbnail: {
                  name: string;
                  hash: string;
                  ext: string;
                  mime: string;
                  width: number;
                  height: number;
                  size: number;
                  url: string;
                };
                medium: {
                  name: string;
                  hash: string;
                  ext: string;
                  mime: string;
                  width: number;
                  height: number;
                  size: number;
                  url: string;
                };
                small: {
                  name: string;
                  hash: string;
                  ext: string;
                  mime: string;
                  width: number;
                  height: number;
                  size: number;
                  url: string;
                };
                large: {
                  name: string;
                  hash: string;
                  ext: string;
                  mime: string;
                  width: number;
                  height: number;
                  size: number;
                  url: string;
                };
              };
              hash: string;
              ext: string;
              mime: string;
              size: number;
            };
          }
        ];
      };
    };
  };
  meta: {};
};
