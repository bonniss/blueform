import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BlueForm } from '@/components';
import { renderWithBlueFormProvider } from '../_utils/render-form';

const TestRoot = ({ children, onSubmit }: any) => (
  <form onSubmit={onSubmit}>{children}</form>
);

describe('BlueForm i18n – label translation', () => {
  it('translates field label using i18nConfig', () => {
    renderWithBlueFormProvider(
      <BlueForm
        renderRoot={TestRoot}
        config={{
          name: {
            type: 'inline',
            label: {
              message: 'form.name',
            },
            render: ({ fieldProps }: any) => (
              <span data-testid="label">{fieldProps.label}</span>
            ),
          },
        }}
      />,
      {
        i18nConfig: {
          t: (key) => `t:${key}`,
          enabled: true,
        },
      }
    );

    expect(screen.getByTestId('label').textContent).toBe('t:form.name');
  });

  it('falls back to raw label when i18n is disabled', () => {
    renderWithBlueFormProvider(
      <BlueForm
        renderRoot={TestRoot}
        config={{
          name: {
            type: 'inline',
            label: 'Raw label',
            render: ({ fieldProps }: any) => (
              <span data-testid="label">{fieldProps.label}</span>
            ),
          },
        }}
      />,
      {
        i18nConfig: {
          t: (key: string) => `t:${key}`,
          enabled: false,
        },
      }
    );

    expect(screen.getByTestId('label').textContent).toBe('Raw label');
  });
});
