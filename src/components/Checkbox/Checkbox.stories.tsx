import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Checkbox from ".";

const storyConfig = {
  title: "Checkbox",
  component: Checkbox
} as ComponentMeta<typeof Checkbox>;

export const Checked: ComponentStory<typeof Checkbox> = () => {
  return <Checkbox checked>Testing Checked</Checkbox>;
};

export const Unchecked: ComponentStory<typeof Checkbox> = () => {
  return <Checkbox>Testing Unchecked</Checkbox>;
};

export default storyConfig;
