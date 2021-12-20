import { useState } from "react";
import Button from "./index";
import { ComponentMeta, ComponentStory } from "@storybook/react";

const storyConfig = {
  title: "Button",
  component: Button,
  argTypes: {
    size: {
      options: ["small", "normal"],
      control: { type: "radio" }
    },
    type: {
      options: ["filled", "outlined", "secondary"],
      control: { type: "select" }
    }
  }
} as ComponentMeta<typeof Button>;

const Template = ({ size, ...args }) => (
  <Button {...args} small={size === "small"}>
    Hello World
  </Button>
);

export const Filled: ComponentStory<typeof Button> = Template.bind({});

Filled.args = {
  type: "filled",
  disabled: false,
  loading: false
};

export const Outlined: ComponentStory<typeof Button> = Template.bind({});

Outlined.args = {
  type: "outlined",
  disabled: false,
  loading: true
};

export const SmallOutlined: ComponentStory<typeof Button> = Template.bind({});

Outlined.args = {
  type: "outlined",
  disabled: false,
  loading: true
};

export const Secondary: ComponentStory<typeof Button> = Template.bind({});

Secondary.args = {
  type: "secondary",
  disabled: true,
  loading: false
};

export const Events: ComponentStory<typeof Button> = () => {
  const [clicked, setClicked] = useState("Click to change text");

  return (
    <Button onClick={() => setClicked("Button Clicked")}>{clicked}</Button>
  );
};

export default storyConfig;
