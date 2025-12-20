import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BlueForm } from '@/components';
import { renderWithBlueFormProvider } from '../_utils/render-form';

const TestRoot = ({ children, onSubmit }: any) => (
  <form onSubmit={onSubmit}>{children}</form>
);

describe('BlueForm i18n', () => {
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

  it('supports TranslatableText object with params', () => {
    renderWithBlueFormProvider(
      <BlueForm
        renderRoot={TestRoot}
        config={{
          name: {
            type: 'inline',
            label: {
              message: 'items.count',
              params: { count: 3 },
            },
            render: ({ fieldProps }: any) => (
              <span data-testid="label">{fieldProps.label}</span>
            ),
          },
        }}
      />,
      {
        i18nConfig: {
          t: (key: string, params?: any) => `${key}:${params?.count}`,
        },
      }
    );

    expect(screen.getByTestId('label').textContent).toBe('items.count:3');
  });

  it('uses fallback when translation returns undefined', () => {
    renderWithBlueFormProvider(
      <BlueForm
        renderRoot={TestRoot}
        config={{
          name: {
            type: 'inline',
            label: {
              message: 'missing.key',
              fallback: 'Fallback label',
            },
            render: ({ fieldProps }: any) => (
              <span data-testid="label">{fieldProps.label}</span>
            ),
          },
        }}
      />,
      {
        i18nConfig: {
          t: () => undefined,
        },
      }
    );

    expect(screen.getByTestId('label').textContent).toBe('Fallback label');
  });

  it('falls back to message when no translation and no fallback', () => {
    renderWithBlueFormProvider(
      <BlueForm
        renderRoot={TestRoot}
        config={{
          name: {
            type: 'inline',
            label: {
              message: 'Raw label',
            },
            render: ({ fieldProps }: any) => (
              <span data-testid="label">{fieldProps.label}</span>
            ),
          },
        }}
      />,
      {
        i18nConfig: {
          t: () => undefined,
        },
      }
    );

    expect(screen.getByTestId('label').textContent).toBe('Raw label');
  });

  it('translates description using i18nConfig', () => {
    renderWithBlueFormProvider(
      <BlueForm
        renderRoot={TestRoot}
        config={{
          name: {
            type: 'inline',
            description: 'field.description',
            render: ({ fieldProps }: any) => (
              <span data-testid="desc">{fieldProps.description}</span>
            ),
          },
        }}
      />,
      {
        i18nConfig: {
          t: (key: string) => `t:${key}`,
        },
      }
    );

    expect(screen.getByTestId('desc').textContent).toBe('t:field.description');
  });
});
