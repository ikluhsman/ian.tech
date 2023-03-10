import { defineStore } from "pinia";
export const useAppStore = defineStore("AppStore", {
  state: () => {
    return {
      randomColor: "#FF4143",
      justification: "justify-center",
      gitHubRepos: [],
      homePage: {},
      aboutPage: {},
      homePageArticles: [],
      homePagePhotos: [],
      resumePage: {},
      gitHubProfile: "",
      aboutThisPage: "",
      article: {},
      imageOverlayIsOpen: false,
      imageOverlayUrl: "",
      footerSection: {}
    };
  },
  actions: {
    async fetchAboutPage() {
      const { find } = useStrapi();
      const res = await find("about-page");
      console.log(res.data);
      this.aboutPage = res.data;
    },
    async setImageOverlayUrl(url) {
      this.imageOverlayUrl = await url;
    },
    async fetchArticle() {
      const { find } = useStrapi();
      const route = useRoute();
      const res = await find("articles", {
        populate: ["image"],
        "filters[slug][$containsi]": route.params.slug,
      });
      this.article = res.data[0];
    },
    async fetchHomePageArticles() {
      // n is the number of articles that should be fetched.
      const { find } = useStrapi();
      const res = await find("articles", {
        populate: ["image"],
        fields: [ "createdAt", "headline", "title", "slug", "id" ]
      });
      this.homePageArticles = res.data;
    },
    async fetchHomePage() {
      const { find } = useStrapi();
      const res = await find("homepage", { populate: ["sections"] });
      this.homePage = res.data;
    },
    async fetchResumePage() {
      const { find } = useStrapi();
      const res = await find("resume", {
        populate: {
          resumeSections: {
            fields: ['*'],
            populate: {
              experiences: {
                fields: ['*'],
                sort: ['startDate:desc'],
                populate: {
                  achievements: {
                    fields: ['*'],
                    sort: ['dateCompleted:desc'],
                    populate: {
                      image: {
                        fields: ['*'],
                      }
                    }
                  },
                  references: {
                    fields: ['*'],
                    populate: {
                      image: {
                        fields: ['*'],
                      }
                    }
                  },
                  skills: {
                    fields: ['*'],
                  },
                },
              }
            }
          }
        }
      });
      this.resumePage = res.data;
    },
    async fetchRandomColor() {
      const arrColors = ["#FF4F4F", "#FF6F0F", "#1F9900", "#1F8FFF", "#8F2FEF"];
      this.randomColor =
        arrColors[Math.floor(Math.random() * arrColors.length)];
    },
    cycleJustification() {
      if (this.justification === "justify-center") {
        this.justification = "justify-end";
      } else if (this.justification === "justify-start") {
        this.justification = "justify-center";
      } else if (this.justification === "justify-end") {
        this.justification = "justify-start";
      }
    },
    async fetchGitHubRepos() {
      const arr = await useFetch(
        "https://api.github.com/users/ikluhsman/repos"
      ).then((repos) => {
        return repos.data.value
          .filter((el) => {
            return el.fork === false;
          })
          .map((r) => {
            return {
              created: r.created_at,
              name: r.name,
              description: r.description,
              url: r.url,
              fork: r.fork,
              clone_url: r.clone_url,
              html_url: r.html_url,
              language: r.language,
            };
          });
      });
      let newarr = arr.sort(function (a, b) {
        return new Date(b.created) - new Date(a.created);
      });
      this.gitHubRepos = newarr;
    },
    async fetchGitHubProfile() {
      const profile = await useFetch(
        "https://raw.githubusercontent.com/ikluhsman/ikluhsman/main/README.md"
      ).then((data) => {
        return data.data.value;
      });
      this.gitHubProfile = profile;
    },
    async fetchAboutThisPage() {
      const about = await useFetch(
        "https://raw.githubusercontent.com/ikluhsman/ian.tech/main/README.md"
      ).then((data) => {
        return data.data.value;
      });
      this.aboutThisPage = about;
    },
  },
  getters: {
    getFooterSection() {
      return this.footerSection;
    },
    getAboutPage() {
      return this.aboutPage;
    },
    getImageOverlayUrl() {
      return this.imageOverlayUrl;
    },
    getImageOverlayStatus() {
      return this.imageOverlayIsOpen;
    },
    getArticle() {
      return this.article;
    },
    getHomePageIntroSection() {
      return this.homePage.attributes.sections.find((s) => {
        return s.name === "intro";
      });
    },
    getHomePageNewsSection() {
      return this.homePage.attributes.sections.find((s) => {
        return s.name === "news";
      });
    },
    getHomePageProjectSection() {
      return this.homePage.attributes.sections.find((s) => {
        return s.name === "projects";
      });
    },
    getHomePagePhotoSection() {
      return this.homePage.attributes.sections.find((s) => {
        return s.name === "photos";
      });
    },
    getAboutThisPage() {
      return this.aboutThisPage;
    },
    getHomePageArticles() {
      return this.homePageArticles;
    },
    getHomePagePhotos() {
      return this.homePagePhotos;
    },
    getGitHubProfile() {
      return this.gitHubProfile;
    },
    getHomePage() {
      return this.homePage;
    },
    getResumePage() {
      return this.resumePage;
    },
    getHomePagePhotos() {
      return this.homePagePhotos;
    },
    getAccentColor() {
      return this.randomColor;
    },
    getGitHubRepos() {
      return this.gitHubRepos;
    },
  },
});
