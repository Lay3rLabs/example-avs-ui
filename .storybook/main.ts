import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/components/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-postcss",
    "@storybook/addon-styling-webpack",
    "@storybook/addon-themes"
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: ['../public/'],
};
export default config;
