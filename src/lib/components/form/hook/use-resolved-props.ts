import { identity } from '@/components/helper/identity';
import { normalizeTranslator } from '@/components/i18n/resolver';
import { BlueFormProps, ComponentMap } from '@/types';
import { FieldValues } from 'react-hook-form';
import { useBlueFormProvider } from '../provider';

export const useResolvedProps = <
  TModel extends FieldValues,
  TComponentMap extends ComponentMap
>(
  blueFormProps: BlueFormProps<TModel, TComponentMap>
) => {
  const {
    fieldMapping: fieldMapping_,
    i18nConfig: i18nConfig_,
    renderRoot: renderRoot_,
    readOnlyEmptyFallback: readOnlyEmptyFallback_,
    ...props
  } = blueFormProps;

  const {
    renderRoot: _renderRoot,
    fieldMapping: _fieldMapping,
    i18nConfig: _i18nConfig,
    readOnlyEmptyFallback: _readOnlyEmptyFallback,
  } = useBlueFormProvider();

  const fieldMapping = fieldMapping_ ?? _fieldMapping;
  const renderRoot = renderRoot_ ?? _renderRoot;
  const i18nConfig = i18nConfig_ ?? _i18nConfig;
  const readOnlyEmptyFallback =
    readOnlyEmptyFallback_ ?? _readOnlyEmptyFallback;

  if (!renderRoot) {
    throw new Error(
      'No `renderRoot` was provided. A `renderRoot` is required to control how the form is rendered.'
    );
  }

  const t =
    i18nConfig?.enabled === false
      ? identity
      : normalizeTranslator(i18nConfig?.t ?? identity);

  return {
    fieldMapping,
    renderRoot,
    i18nConfig: {
      t,
    },
    readOnlyEmptyFallback,
    ...props,
  };
};
