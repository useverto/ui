import React from "react";
import { VertoProvider } from "../src/index";

export const parameters = {
  options: {
    storySort: (a, b) => {
      // We want the Welcome story at the top
      if (b[1].kind === "Welcome") {
        return 1;
      }

      // Sort the other stories by ID
      // https://github.com/storybookjs/storybook/issues/548#issuecomment-530305279
      return a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, { numeric: true });
    }
  }
};

// wrap components with the Verto provider
export const decorators = [
  (Story, context) => (
    <VertoProvider theme={context.globals.theme}>
      <Story />
    </VertoProvider>
  )
];

// for the ui theme
export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "Light",
    toolbar: {
      icon: "circlehollow",
      items: ["Light", "Dark"],
      showName: true
    }
  }
};
