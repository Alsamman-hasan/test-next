import {
  CSSProperties,
  InputHTMLAttributes,
  ReactNode,
  useMemo,
  useState,
} from 'react';
import cls from './Input.module.scss';
import { classNames } from '../../../../lib/classNames/classNames';
import { PTag } from '../../../../ui/Paragraph/P';
import { HStack } from '../../../Stack';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly'
>;

export interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  label?: string | undefined | null;
  errorMessage?: string;
  style?: CSSProperties;
  name: string;
  info?: string;
  error?: boolean;
  endIcon?: ReactNode;
  ref?: any;
}

export const Input = (props: InputProps) => {
    const {
      className,
      label,
      value,
      onChange,
      type = 'text',
      required = false,
      errorMessage,
      style,
      name,
      error,
      info,
      endIcon,
      ref,
      ...otherProps
    } = props;

    const [focused, setFocused] = useState(false);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    const handleFocus = () => {
      setFocused(true);
    };
    const handleBlur = () => {
      setFocused(true);
    };


    return (
      <div className={classNames(cls.Input, {}, [className])}>
        <div className={cls.inputWrapper}>
          <input
          ref={ref}
            style={style}
            id={`${name}inputUI`}
            value={value}
            type={type}
            name={`${name}inputUI`}
            required={required}
            aria-invalid={(!!focused && Boolean(errorMessage)) || error}
            className={classNames('', {
              [cls.errors]: Boolean(errorMessage),
            })}
            onChange={onChangeHandler}
            onBlur={handleBlur}
            onFocus={handleFocus}
            {...otherProps}
          />
          {!!endIcon && !!value && (
            <div className={cls.clearIcon}>
              <HStack max className={cls.corse} align='center' justify='center'>
                {endIcon}
              </HStack>
            </div>
          )}
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
        {!!label && (
          <label htmlFor={`${name}inputUI`}>
            <PTag tage='P3' className={cls.Label}>
              {`${label} ${required ? '*' : ''}`}
            </PTag>
          </label>
        )}
      </div>
    );
  };

