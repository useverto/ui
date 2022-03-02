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

const PopoverTemplate = (args) => (
  <Popover
    {...args}
    content={
      <>
        <h1>Testing</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
      </>
    }
  >
    test
  </Popover>
);

export const WithClick = PopoverTemplate.bind({});

WithClick.args = {
  mode: "click",
  position: "bottom"
};

export const WithHover = PopoverTemplate.bind({});

WithHover.args = {
  mode: "hover",
  position: "bottom"
};

export default storyConfig;
