import {
  CSSProperties,
  memo,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import cls from './CustomSelect.module.scss';
import { PTag } from '../../../Paragraph/P';
import { Input } from '../Input/Input';
import { classNames } from '@/shared/lib/classNames/classNames';

const Icon = ({ iconClass }: { iconClass: string }) => (
  <svg
    viewBox='0 0 24 24'
    width='18'
    height='18'
    stroke='#222'
    strokeWidth='1.5'
    fill='none'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={iconClass}
  >
    <polyline points='6 9 12 15 18 9' />
  </svg>
);

export interface CustomSelectProps {
  className?: string;
  placeHolder: string;
  options: Autocomplete[];
  isSearchable?: boolean;
  onChange: (value: Autocomplete) => void;
  align?: string;
  value?: Autocomplete;
  isDisabled?: boolean;
  name: string;
  label?: string;
  style?: CSSProperties;
  required?: boolean;
  errorMessage?: string;
}
export const CustomSelect = (props: CustomSelectProps) => {
  const {
    className,
    onChange,
    options,
    placeHolder,
    align,
    isSearchable,
    value,
    isDisabled,
    name,
    style,
    label,
    required,
    errorMessage,
  } = props;
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Autocomplete | undefined>(
    value,
  );
  const [searchValue, setSearchValue] = useState('');
  const searchRef = useRef() as MutableRefObject<HTMLInputElement>;
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  const handleInputClick = useCallback(() => {
    if (isDisabled) return null;
    setShowMenu(!showMenu);
  }, [isDisabled, showMenu]);

  const getDisplay = useCallback(() => {
    if (!selectedValue) return placeHolder;
    return selectedValue.label;
  }, [placeHolder, selectedValue]);

  const onItemClick = useCallback(
    (option: Autocomplete) => {
      setSelectedValue(option);
      onChange(option);
    },
    [onChange],
  );

  const isSelected = useCallback(
    (option: Autocomplete) => {
      if (!selectedValue) return false;

      return selectedValue.value === option.value;
    },
    [selectedValue],
  );

  const onSearch = useCallback((search: string) => {
    setSearchValue(search);
  }, []);

  const getOptions = useCallback(() => {
    if (!searchValue) return options;

    return options.filter(
      option =>
        option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0,
    );
  }, [options, searchValue]);

  useEffect(() => {
    setSearchValue('');
    if (showMenu && searchRef.current) searchRef.current.focus();
  }, [showMenu]);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  useEffect(() => {
    const handler = (e: any) => {
      if (inputRef.current && !inputRef.current.contains(e.target))
        setShowMenu(false);
    };

    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  });
  return (
    <div style={style} className={classNames(cls.wrapper, {}, [className])}>
      {!!label && (
        <PTag tage='P3' className={cls.Label}>
          {`${label} ${required ? '*' : ''}`}
        </PTag>
      )}
      <div
        className={classNames(
          cls.CustomSelect,
          {
            [cls.isDisabled]: !!isDisabled,
            [cls.errors]: Boolean(errorMessage),
          },
          [className],
        )}
      >
        <div
          ref={inputRef}
          className={cls.dropdownInput}
          onClick={handleInputClick}
        >
          <div
            className={classNames(
              cls.dropdownSelectedValue,
              { [cls.placeholder]: !selectedValue },
              [],
            )}
          >
            {getDisplay()}
          </div>
          <div className={cls.dropdownTools}>
            <div className={cls.dropdownTool}>
              <Icon iconClass={showMenu ? cls.translate : ''} />
            </div>
          </div>
        </div>
        {!!showMenu && (
          <div
            className={classNames(cls.dropdownMenu, { [cls.auto]: !align }, [
              align,
            ])}
          >
            {!!isSearchable && (
              <div className={cls.searchBox}>
                <Input
                  ref={searchRef}
                  style={{ height: '40px' }}
                  name={name}
                  placeholder='Search'
                  className={cls.formControl}
                  value={searchValue}
                  onChange={onSearch}
                />
              </div>
            )}
            {getOptions().map(option => (
              <div
                key={option.value}
                className={classNames(
                  cls.dropdownItem,
                  { [cls.selected]: isSelected(option) },
                  [],
                )}
                onClick={() => onItemClick(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {!!errorMessage && (
        <PTag
          tage='desc'
          className={classNames(cls.error, {
            [cls.errorMessage]: Boolean(errorMessage),
          })}
        >
          {errorMessage}
        </PTag>
      )}
    </div>
  );
};
