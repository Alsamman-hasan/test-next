import { memo, useCallback } from 'react';
import { CustomSelect } from '@/shared/ui/Inputs';

export interface StepsSelectProps {
  className?: string;
  value?: Autocomplete;
  onChange: (value: Autocomplete) => void;
}

const items: Autocomplete[] = [
  { label: '10', value: 10 },
  { label: '20', value: 20 },
  { label: '40', value: 40 },
];

export const StepsSelect = (props: StepsSelectProps) => {
  const { className, onChange, value } = props;
  const onChangeSelect = useCallback(
    (selectedValue: Autocomplete) => {
      onChange(selectedValue);
    },
    [onChange],
  );
  return (
    <CustomSelect
      className={className}
      style={{ width: '86px' }}
      isSearchable={false}
      value={value}
      name='category'
      options={items || []}
      placeHolder=''
      onChange={onChangeSelect}
    />
  );
};
