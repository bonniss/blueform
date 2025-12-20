import { Story } from '@ladle/react';
import BlueForm from '../components/form/BlueForm';

export const BlueFormStory: Story = () => {
  return (
    <BlueForm
      config={{
        name: { type: 'text' },
      }}
      fieldMapping={{
        text: () => <span>text</span>,
      }}
    />
  );
};
