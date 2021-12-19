import React from "react";
import Spacer from ".";
import { ComponentMeta, ComponentStory } from "@storybook/react";

const storyConfig = {
  title: "Spacer",
  component: Spacer
} as ComponentMeta<typeof Spacer>;

const template: ComponentStory<typeof Spacer> = (args) => (
  <>
    <h1>Hello World</h1>
    <Spacer {...args} />
    <h2>Testing Spacer</h2>
  </>
);

export const TestSpacer = template.bind({});

TestSpacer.args = {
  x: 2,
  y: 4,
  inline: false
};

export default storyConfig;
