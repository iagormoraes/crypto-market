import { HTMLAttributes } from 'react';
import classnames from 'classnames';

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string;
  children?: any;
}

export default function SimpleCard({
  title,
  children,
  className,
  ...props
}: Props) {
  return (
    <div
      className={classnames(
        'rounded shadow-xl w-full md:w-48 overflow-hidden',
        className,
      )}
      {...props}
    >
      <div>
        <h3 className="text-center text-white font-bold p-2 bg-yellow-500">
          {title}
        </h3>
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
}
