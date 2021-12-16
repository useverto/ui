import { ComponentMeta, ComponentStory } from "@storybook/react";
import Modal from ".";

const storyConfig = {
  title: "Modal",
  component: Modal
} as ComponentMeta<typeof Modal>;

const Template = (args) => <Modal {...args} />;

export const Open: ComponentStory<typeof Modal> = Template.bind({});

Open.args = {
  open: true
};

export const Closed: ComponentStory<typeof Modal> = Template.bind({});

Closed.args = {
  open: false
};

export default storyConfig;
