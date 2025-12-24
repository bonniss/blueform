import { themes } from "prism-react-renderer"

/** @type {import('@ladle/react').UserConfig} */
export default {
  base: "/react-headless-form/",
  outDir: "ladle-static",
  defaultStory: "core--hello-world",
  addons: {
    theme: {
      enabled: false,
    },
    source: {
      themeLight: themes.dracula,
      themeDark: themes.gruvboxMaterialLight,
    },
  },
}
