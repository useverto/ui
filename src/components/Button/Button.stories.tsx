import Button from "./index";
import { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

const storyConfig = {
  title: "Button",
  component: Button,
  argTypes: {
    size: {
      options: ["small", "normal"],
      control: { type: "radio" }
    }
  }
} as ComponentMeta<typeof Button>;

const Template = ({ size, ...args }) => (
  <Button {...args} small={size === "small"}>
    Hello World
  </Button>
);

export const Primary: ComponentStory<typeof Button> = Template.bind({});

Primary.args = {
  disabled: false,
  loading: false,
  fullWidth: false
};

export const Secondary: ComponentStory<typeof Button> = Template.bind({});

Secondary.args = {
  secondary: true,
  loading: false,
  fullWidth: false,
  disabled: false
};

export const Events: ComponentStory<typeof Button> = () => {
  const [clicked, setClicked] = useState("Click to change text");

  return (
    <Button onClick={() => setClicked("Button Clicked")}>{clicked}</Button>
  );
};

export default storyConfig;
