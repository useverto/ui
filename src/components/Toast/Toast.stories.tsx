import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Toast from "./index";

const storyConfig = {
  title: "Toast",
  component: Toast,
  argTypes: {
    type: {
      options: ["success", "info", "error", "warning"],
      control: { type: "select" }
    }
  }
} as ComponentMeta<typeof Toast>;

const ToastTemplate: ComponentStory<typeof Toast> = (args) => (
  <Toast {...args} />
);

export const TestToast = ToastTemplate.bind({});

TestToast.args = {
  title: "Testing toast",
  description: "This is just a simple test for this toast in storybook js",
  type: "success"
};

export default storyConfig;
