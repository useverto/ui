import { useState } from "react";
import Button from "./index";
import { ComponentMeta, ComponentStory } from "@storybook/react";

const storyConfig = {
  title: "Button",
  component: Button
} as ComponentMeta<typeof Button>;

const Template = (args) => <Button {...args}>Hello World</Button>;

export const Filled: ComponentStory<typeof Button> = Template.bind({});

Filled.args = {
  type: "filled",
  small: true,
  disabled: false,
  loading: false
};

export const Outlined: ComponentStory<typeof Button> = Template.bind({});

Outlined.args = {
  type: "outlined",
  small: false,
  disabled: false,
  loading: true
};

export const Secondary: ComponentStory<typeof Button> = Template.bind({});

Secondary.args = {
  type: "secondary",
  small: false,
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
