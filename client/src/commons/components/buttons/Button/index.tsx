import { HTMLAttributes } from 'react';
import classnames from 'classnames';
import styles from './style.module.css';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  alt?: boolean;
}

export enum ButtonVariant {
  Regular = 'Regular',
  Small = 'Small',
}

export default function Button({
  variant = ButtonVariant.Regular,
  alt,
  children,
  className,
  ...props
}: Props) {
  const variants = {
    [ButtonVariant.Regular]: styles.btnRegular,
    [ButtonVariant.Small]: styles.btnSmall,
  };

  return (
    <button
      className={classnames(
        styles.btn,
        variants[variant],
        { [styles.btnAlt]: alt },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
