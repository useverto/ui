import { ComponentMeta, ComponentStory } from "@storybook/react";
import Input from ".";

const storyConfig = {
  title: "Input",
  component: Input,
  argTypes: {
    status: {
      options: [undefined, "error", "warning", "success"],
      control: { type: "select" }
    },
    type: {
      options: ["text", "number", "password"],
      control: { type: "select" }
    }
  }
} as ComponentMeta<typeof Input>;

const Template = (args) => <Input {...args} />;

export const WithType: ComponentStory<typeof Input> = Template.bind({});

WithType.args = {
  type: "password",
  placeholder: "Testing"
};

export const WithLabel: ComponentStory<typeof Input> = Template.bind({});

WithLabel.args = {
  type: "text",
  currency: "$",
  inlineLabel: "VRT",
  placeholder: "10000",
  label: "Hello World",
  disabled: false
};

export const WithLeftLineLabel: ComponentStory<typeof Input> = Template.bind(
  {}
);

WithLeftLineLabel.args = {
  ...WithLabel.args,
  leftInlineLabel: true
};

export const WithStatus: ComponentStory<typeof Input> = Template.bind({});

WithStatus.args = {
  ...WithLeftLineLabel.args,
  status: "error"
};

export const WithAllProps: ComponentStory<typeof Input> = Template.bind({});

WithAllProps.args = {
  ...WithLabel.args,
  disabled: false,
  readOnly: false,
  small: false,
  type: "number"
};
export default storyConfig;
