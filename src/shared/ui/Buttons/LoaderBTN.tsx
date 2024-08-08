
import cls from './Button.module.scss';
import { classNames } from '../../lib/classNames/classNames';

export interface LoaderBTNProps {
  className?: string;
}
export const LoaderBTN = (props: LoaderBTNProps) => {
  const { className } = props;
  return (
    <svg className={classNames(cls.svg, {}, [className])} viewBox='25 25 50 50'>
      <circle className={cls.circle} r='20' cy='50' cx='50' />
    </svg>
  );
};
