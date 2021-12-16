const path = require("path");

module.exports = {
  stories: ["../src/components/**/*.stories.@(ts|tsx|js|jsx|mdx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  webpackFinal: async (config) => {
    config.module.rules = config.module.rules.filter(
      (f) => f.test.toString() !== "/\\.sass$/"
    );

    config.module.rules.push({
      test: /\.sass$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            modules: {
              auto: true
            }
          }
        },
        "sass-loader"
      ],
      include: path.resolve(__dirname, "../src")
    });
    return config;
  },
  core: {
    builder: "webpack5"
  },
  typescript: {
    reactDocgen: false
  }
};
