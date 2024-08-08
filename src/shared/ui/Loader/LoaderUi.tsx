import { memo } from 'react';
import cls from './LoaderUi.module.scss';
import { classNames } from '../../lib/classNames/classNames';

export interface LoaderUiProps {
  className?: string;
}
export const Loader = (props: LoaderUiProps) => {
  const { className } = props;
  return <div className={classNames(cls.loaderUI, {}, [className])} />;
};
