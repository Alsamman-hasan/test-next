import {
  CSSProperties,
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
} from 'react';
import cls from './Flex.module.scss';
import { classNames, Mods } from '../../../lib/classNames/classNames';

export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexWrap = 'nowrap' | 'wrap';

const justifyClass: Record<FlexJustify, string> = {
  around: cls.justifyAround,
  between: cls.justifyBetween,
  center: cls.justifyCenter,
  end: cls.justifyEnd,
  start: cls.justifyStart,
};

const alignClass: Record<FlexAlign, string> = {
  center: cls.alignCenter,
  end: cls.alignEnd,
  start: cls.alignStart,
};

const directionClass: Record<FlexDirection, string> = {
  column: cls.depictionColumn,
  row: cls.depictionRow,
};

type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
export interface FlexProps extends DivProps {
  className?: string;
  children: ReactNode;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction: FlexDirection;
  wrap?: FlexWrap;
  gap?: number | string;
  max?: boolean;
  style?: CSSProperties;
}

export const Flex = (props: FlexProps) => {
  const {
    className,
    children,
    direction = 'row',
    align = 'center',
    justify = 'start',
    wrap = 'nowrap',
    gap = 0,
    style,
    max,
    ...otherProps
  } = props;

  const classes = [
    className,
    justifyClass[justify],
    alignClass[align],
    directionClass[direction],
    cls[wrap],
  ];
  const mods: Mods = {
    [cls.max]: max,
  };
  return (
    <div
      style={{ ...style, gap: `${Number(gap) * 10}px` }}
      className={classNames(cls.Flex, mods, classes)}
      {...otherProps}
    >
      {children}
    </div>
  );
};
