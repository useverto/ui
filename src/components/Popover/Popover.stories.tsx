import React from "react";
import Popover from ".";
import { ComponentMeta, ComponentStory } from "@storybook/react";

const storyConfig = {
  title: "Popover",
  component: Popover,
  argTypes: {
    mode: {
      options: ["click", "hover"],
      control: { type: "radio" }
    }
  }
} as ComponentMeta<typeof Popover>;

const PopoverTemplate = (args) => <Popover {...args} />;

export const WithClick = PopoverTemplate.bind({});

WithClick.args = {
  mode: "click"
};

export const WithHover = PopoverTemplate.bind({});

WithHover.args = {
  mode: "hover"
};

export default storyConfig;
