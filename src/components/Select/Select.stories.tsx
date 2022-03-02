import React from "react";
import Select from ".";
import { ComponentMeta, ComponentStory } from "@storybook/react";

const storyConfig = {
  title: "Select",
  component: Select,
  argTypes: {
    status: {
      options: [undefined, "error", "warning", "sucess"],
      control: { type: "select" }
    }
  }
} as ComponentMeta<typeof Select>;

const template: ComponentStory<typeof Select> = (args) => (
  <Select {...args}>
    <option value="AR">AR</option>
    <option value="BTC">BTC</option>
    <option value="VRT">VRT</option>
    <option value="ETH">ETH</option>
    <option value="USDT">USDT</option>
  </Select>
);

export const TestSelect = template.bind({});

TestSelect.args = {
  disabled: false,
  filled: true,
  small: false,
  status: undefined
};

export default storyConfig;
