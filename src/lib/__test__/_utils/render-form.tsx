import { render } from '@testing-library/react';
import { BlueFormProvider } from '@/components/form/provider/FormProvider';

export function renderWithBlueFormProvider(
  ui: React.ReactElement,
  providerProps?: React.ComponentProps<typeof BlueFormProvider>
) {
  return render(
    <BlueFormProvider
      renderRoot={(props: any) => <form {...props} />}
      {...providerProps}
    >
      {ui}
    </BlueFormProvider>
  );
}
