// src/features/shared/components/Buttons/SubmitButton.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SubmitButton } from './SubmitButton';
import { Box } from '@mui/material';

const meta: Meta<typeof SubmitButton> = {
  title: 'features/shared/components/Buttons/SubmitButton',
  component: SubmitButton,
  tags: ['autodocs'],
  args: {
    idleText: 'Create Item',
    updateText: 'Update Item',
    isSubmitting: false,
    isUpdate: false,
    variant: 'contained',
    fullWidth: false,
    color: 'primary',
  },
};

export default meta;
type Story = StoryObj<typeof SubmitButton>;

/* ------------ Default Button ------------ */
export const Default: Story = {};

/* ------------ Update Mode ------------ */
export const UpdateMode: Story = {
  args: {
    isUpdate: true,
  },
};

/* ------------ Submitting State ------------ */
export const Submitting: Story = {
  args: {
    isSubmitting: true,
  },
};

/* ------------ Full Width Button ------------ */
export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
};

/* ------------ With Custom Loading Text ------------ */
export const CustomLoadingText: Story = {
  args: {
    isSubmitting: true,
    loadingText: 'Processing...',
  },
};

/* ------------ Centered in Container ------------ */
export const Centered: Story = {
  render: (args) => (
    <Box display="flex" justifyContent="center" width="100%" p={4}>
      <SubmitButton {...args} />
    </Box>
  ),
};
