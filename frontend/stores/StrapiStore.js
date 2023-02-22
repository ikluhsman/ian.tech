import { defineStore } from "pinia";
export const useStrapiStore = defineStore("StrapiStore", {
    state: () => {
        return {
            homePage: {}
        };
    },
    actions: {
        async fetchHomePage() {
            const { find } = useStrapi();
            const res = await find("homepage", { populate: 'hero'})
            this.homePage = res.data;
        }
    },
    getters: {
        getHomepage() {
            return this.homePage
        }
    }
});