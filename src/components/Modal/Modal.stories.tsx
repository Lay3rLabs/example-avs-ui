import { Meta, StoryObj } from "@storybook/react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/Modal/Modal";

// Default metadata for the story
const meta: Meta<typeof Modal> = {
  title: "General/Modal",
  component: Modal,
  argTypes: {
    isOpen: { control: "boolean" },
    onClose: { action: "closed" },
  },
};

export default meta;

// The story type for the component
type Story = StoryObj<typeof Modal>;

export const DefaultModal: Story = {
  args: {
    isOpen: true,
  },
  render: (args) => (
    <Modal {...args}>
      <ModalHeader>Test</ModalHeader>
      <ModalBody>
        <p>Modal content goes here.</p>
      </ModalBody>
      <ModalFooter>
        <button
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
          onClick={args.onClose}
        >
          Close
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Save changes
        </button>
      </ModalFooter>
    </Modal>
  ),
};
