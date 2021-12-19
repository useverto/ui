import React from "react";
import Page from ".";
import { ComponentMeta, ComponentStory } from "@storybook/react";

const storyConfig = {
  title: "Page",
  component: Page,
  argTypes: {
    size: {
      options: ["large", "normal", "small"],
      control: { type: "select" }
    }
  }
} as ComponentMeta<typeof Page>;

const template: ComponentStory<typeof Page> = (args) => (
  <Page {...args}>
    <h1>Hello World</h1>
    <h2>Testing Page</h2>
    <h3>Testing Again</h3>
    <h4>One More Time</h4>
    <h5>Ok This Is It</h5>
    <h6>Testing 😬</h6>
  </Page>
);

export const TestPage = template.bind({});

TestPage.args = {};

export default storyConfig;
