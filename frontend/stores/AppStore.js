import { defineStore } from "pinia";
export const useAppStore = defineStore("AppStore", {
  state: () => {
    return {
      randomColor: "#FF4143",
      justification: "justify-center",
      gitHubRepos: [],
      homePage: {},
      homePageArticles: [],
      homePagePhotos: [],
      resumePage: {},
      gitHubProfile: "",
      aboutThisPage: "",
    };
  },
  actions: {
    async fetchArticle() {
      const { find } = useStrapi();
      const route = useRoute();
      const res = await find("articles", {
        populate: ["image"],
        "filters[slug][$containsi]": route.params.title,
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
        populate: [
          "experiences.experiences",
          "experiences.experiences.achievements",
          "experiences.experiences.skills",
          "education.experiences",
          "education.experiences.achievements",
          "education.experiences.skills",
          "skills.skills",
        ],
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
    getResumePage_Experiences() {
      let exps = this.resumePage.attributes.experiences.experiences.data.sort(
        function (a, b) {
          return (
            new Date(b.attributes.startDate) - new Date(a.attributes.startDate)
          );
        }
      );
      return exps;
    },
    getResumePage_Experiences() {
      let exps = this.resumePage.attributes.experiences.experiences.data.sort(
        function (a, b) {
          return (
            new Date(b.attributes.startDate) - new Date(a.attributes.startDate)
          );
        }
      );
      return exps;
    },
    getResumePage_Education() {
      let exps = this.resumePage.attributes.education.experiences.data.sort(
        function (a, b) {
          return (
            new Date(b.attributes.startDate) - new Date(a.attributes.startDate)
          );
        }
      );
      return exps;
    },
    getResumePage_Skills() {
      let exps = this.resumePage.attributes.skills.skills.data.sort(function (
        a,
        b
      ) {
        return (
          new Date(b.attributes.dateAcquired) -
          new Date(a.attributes.dateAcquired)
        );
      });
      return exps;
    },
    getAccentColor() {
      return this.randomColor;
    },
    getGitHubRepos() {
      return this.gitHubRepos;
    },
  },
});
