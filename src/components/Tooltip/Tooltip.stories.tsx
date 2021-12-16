import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Tooltip from ".";

export default {
  title: "Tooltip",
  component: Tooltip,
  argTypes: {
    position: {
      options: ["right", "left", "top", "bottom"],
      control: { type: "radio" }
    }
  }
} as ComponentMeta<typeof Tooltip>;

const Template = (args) => <Tooltip {...args}>Example tooltip</Tooltip>;

export const ToolTip: ComponentStory<typeof Tooltip> = Template.bind({});

ToolTip.args = {
  position: "right",
  text: "Tooltip text",
  arrow: false
};
