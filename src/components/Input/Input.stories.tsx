import { ComponentMeta, ComponentStory } from "@storybook/react";
import Input from ".";

const storyConfig = {
  title: "Input",
  component: Input
} as ComponentMeta<typeof Input>;

const Template = (args) => <Input {...args} />;

export const withLabel: ComponentStory<typeof Input> = Template.bind({});

withLabel.args = {
  type: "text",
  currency: "$",
  inlineLabel: "VRT",
  placeholder: "10000",
  label: "Hello World"
};

export const withLeftLineLabel: ComponentStory<typeof Input> = Template.bind(
  {}
);

withLeftLineLabel.args = {
  ...withLabel.args,
  leftInlineLabel: true
};

export const withStatus: ComponentStory<typeof Input> = Template.bind({});

withStatus.args = {
  ...withLeftLineLabel.args,
  status: "error" // "undefined | "error" | "warning" | "success"
};

export default storyConfig;
