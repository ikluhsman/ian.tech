import { defineStore } from "pinia";
export const useAppStore = defineStore("AppStore", {
  state: () => {
    return {
      randomColor: "#FF4143",
      justification: "justify-center",
      gitHubRepos: [],
      homePage: {},
      historyPage: {},
      resumePage: {},
      gitHubProfile: "",
      aboutThisPage: "",
    };
  },
  actions: {
    async fetchHomePage() {
      const { find } = useStrapi();
      const res = await find("homepage", { populate: ["intro", "news"] });
      this.homePage = res.data;
    },
    async fetchResumePage() {
      const { find } = useStrapi();
      const res = await find("resume", {
        populate: [
          "heading",
          "experiences.experiences",
          "experiences.experiences.achievements",
          "experiences.experiences.skills",
          "education.experiences",
          "education.experiences.achievements",
          "education.experiences.skills",
          "skills.skills",
        ],
      });
      // this.experiences = res.data.attributes.experiences.experiences.data;
      console.log(res.data);
      this.resumePage = res.data;
    },
    async fetchHistoryPage() {
      const { find } = useStrapi();
      const res = await find("history", { populate: "story" });
      this.historyPage = res.data;
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
    }
  },
  getters: {
    getAboutThisPage() {
      return this.aboutThisPage;
    },
    getGitHubProfile() {
      return this.gitHubProfile;
    },
    getHomepage() {
      return this.homePage;
    },
    getResumePage() {
      console.log(this.resumePage);
      return this.resumePage;
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
    getHistory() {
      return this.historyPage;
    },
    getAccentColor() {
      return this.randomColor;
    },
    getGitHubRepos() {
      return this.gitHubRepos;
    },
  },
});
