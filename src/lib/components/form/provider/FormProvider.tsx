import { BlueFormProviderOptions } from '@/types/form-provider';
import { FunctionComponent, PropsWithChildren } from 'react';
import { createProvider } from 'react-easy-provider';

const [useContextValue, Provider] = createProvider(
  (x?: BlueFormProviderOptions) => x
);

export const BlueFormProvider: FunctionComponent<
  BlueFormProviderOptions & PropsWithChildren
> = ({ children, ...props }) => (
  <Provider defaultValue={props}>{children}</Provider>
);

export const useBlueFormProvider = () =>
  useContextValue({
    shouldFailQuietly: true,
    fallback: {},
  }) ?? {};
