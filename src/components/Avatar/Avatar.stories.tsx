import React from "react";
import Avatar from ".";
import { ComponentMeta, ComponentStory } from "@storybook/react";

const storyConfig = {
  title: "Avatar",
  component: Avatar,
  argTypes: {
    size: {
      options: ["small", "large", "large-inline"],
      control: { type: "select" }
    }
  }
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const SmallAvatar = Template.bind({});

SmallAvatar.args = {
  size: "small",
  usertag: "superuser101",
  displaytag: "superUser101",
  name: "John Cliff Webthree",
  notification: false,
  left: false,
  verified: true,
  onlyProfilePicture: false
};

export const LargeAvatar = Template.bind({});

LargeAvatar.args = {
  ...SmallAvatar.args,
  size: "large"
};

export const LargeInlineAvatar = Template.bind({});

LargeInlineAvatar.args = {
  ...SmallAvatar.args,
  size: "large-inline"
};

export default storyConfig;
