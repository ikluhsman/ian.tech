import { defineStore } from "pinia";
export const useAppStore = defineStore("AppStore", {
  state: () => {
    return {
      randomColor: "#ff0000",
      justification: "justify-center",
    };
  },
  actions: {
    fetchRandomColor() {
      const arrColors = ["#FF4143", "#FF9C04", "#07AD1B", "#2D7EF0", "#8922CB"];
      this.randomColor =
        arrColors[Math.floor(Math.random() * arrColors.length)];
    },
    setJustification() {
      if (this.justification === "justify-center") {
        this.justification = "justify-end";
      } else if (this.justification === "justify-start") {
        this.justification = "justify-center";
      } else if (this.justification === "justify-end") {
        this.justification = "justify-start";
      }
    },
  },
  getters: {},
});
