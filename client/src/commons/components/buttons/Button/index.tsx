import { forwardRef, ButtonHTMLAttributes, Ref } from 'react';
import classnames from 'classnames';
import styles from './style.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  alt?: boolean;
}

export enum ButtonVariant {
  Regular = 'Regular',
  Small = 'Small',
}

function ButtonComponent(
  {
    variant = ButtonVariant.Regular,
    alt,
    children,
    className,
    ...props
  }: Props,
  ref: Ref<HTMLButtonElement>,
) {
  const variants = {
    [ButtonVariant.Regular]: styles.btnRegular,
    [ButtonVariant.Small]: styles.btnSmall,
  };

  return (
    <button
      ref={ref}
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

const Button = forwardRef(ButtonComponent);

export default Button;
