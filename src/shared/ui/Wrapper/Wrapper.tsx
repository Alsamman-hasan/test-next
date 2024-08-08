import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Wrapper.module.scss";

export interface LayoutProps {
  className?: string;
  children: React.ReactNode;
}
export const Wrapper = (props: LayoutProps) => {
  const { className, children } = props;
  return (
    <div className={classNames(cls.Wrapper, {}, [className])}>
      {children}
    </div>
  );
};
