import { LOCAL_STORAGE_KEY } from "./consts"
import LocalStorage from "./utils/LocalStorage"

App({
  globalData: {
    localStorage: null,
    maxScore: 0
  },
  onCreate(options) {
    this.globalData.localStorage = new LocalStorage(LOCAL_STORAGE_KEY);
    // RESET maxScore TO 1
    // this.globalData.localStorage.set({
    //   maxScore: 0
    // });

    const data = this.globalData.localStorage.get();
    this.globalData.maxScore = data.maxScore || 0;
  },

  onDestroy(options) {

  }
})
