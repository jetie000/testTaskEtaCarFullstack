import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import './button.module.scss'

const meta = {
  title: 'Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Button',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    children: 'Button',
    type: 'round'
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Button',
    type: 'circle'
  },
};
