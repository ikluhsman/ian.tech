import { defineStore } from "pinia";
export const useAppStore = defineStore("AppStore", {
  state: () => {
    return {
      randomColor: "#FF4143",
      justification: "justify-center",
      gitHubRepos: [],
      homePage: {},
      experiences: [],
      historyPage: {}
    };
  },
  actions: {
    async fetchHomePage() {
      const { find } = useStrapi();
      const res = await find("homepage", { populate: [ "intro", "news" ] });
      this.homePage = res.data;
    },
    async fetchResumePage() {
      const { find } = useStrapi();
      const res = await find("experiences");
      let newarr = res.data.sort(function (a, b) {
        return new Date(b.attributes.startDate) - new Date(a.attributes.startDate);
      });
      this.experiences = newarr;
    },
    async fetchHistoryPage() {
      const { find } = useStrapi();
      const res = await find("history", { populate: "story" });
      this.historyPage = res.data;
    },
    async fetchRandomColor() {
      const arrColors = ["#FF4143", "#FF9C04", "#07AD1B", "#2D7EF0", "#8922CB"];
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
      const headers = useRequestHeaders();
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
              language: r.language
            };
          });
      });
      let newarr = arr.sort(function (a, b) {
        return new Date(b.created) - new Date(a.created);
      });
      this.gitHubRepos = newarr;
    },
  },
  getters: {
    getHomepage() {
      return this.homePage;
    },
    getHistory() {
      return this.historyPage;
    },
    getAccentColor() {
      return this.randomColor;
    },
    getGitHubRepos() {
      return this.gitHubRepos;
    }
  },
});
