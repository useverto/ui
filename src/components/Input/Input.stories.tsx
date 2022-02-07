import { ComponentMeta, ComponentStory } from "@storybook/react";
import Input from ".";
import Toast from "../Toast";
import { useState } from "react";
import { NorthStarIcon } from "@primer/octicons-react";
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

export const WithSmallInput: ComponentStory<typeof Input> = Template.bind({});

WithSmallInput.args = {
  ...WithLeftLineLabel.args,
  small: true
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

export const KeyPressHandler = () => {
  const [clickEnter, setClickEnter] = useState(false);
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setClickEnter(true);
    }
  };

  return (
    <>
      <h1>Testing KeyPress</h1>
      <Input onKeyPressHandler={handleKeyPress} />
      {clickEnter ? (
        <Toast
          title="Enter Button Clicked"
          description="OnKeyPressHandler Working"
          type="success"
        />
      ) : null}
    </>
  );
};

export const WithIcon = () => (
  <Input inlineLabel={<NorthStarIcon />} placeholder="Testing Icon" />
);
