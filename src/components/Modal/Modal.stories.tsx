import { ComponentMeta, ComponentStory } from "@storybook/react";
import Modal from ".";

const storyConfig = {
  title: "Modal",
  component: Modal
} as ComponentMeta<typeof Modal>;

const Template = (args) => (
  <Modal {...args}>
    <Modal.Title>Modal Title</Modal.Title>
    <Modal.Content>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </Modal.Content>
  </Modal>
);

export const Open: ComponentStory<typeof Modal> = Template.bind({});

Open.args = {
  open: true
};

export const Closed: ComponentStory<typeof Modal> = Template.bind({});

Closed.args = {
  open: false
};

export default storyConfig;
