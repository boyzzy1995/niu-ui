import React from 'react';
import classNames from 'classnames';

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
}

export enum ButtonType {
  Primary = 'primary',
  Danager = 'danger',
  Default = 'default',
  Link = 'link'
}

interface BaseButtonProps {
  btnType: ButtonType,
  btnSize: ButtonSize,
  href: string,
  disabled: boolean,
  className: string
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = (props) => {
  const {
    btnType,
    btnSize,
    children,
    href,
    disabled,
    className,
    ...restProps
  } = props;

  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${btnSize}`]: btnSize,
    'disabled': btnType === ButtonType.Link && disabled
  });
  if (btnType === ButtonType.Link && href) {
    return <a href={href} className={classes} {...restProps}>{children}</a>
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default
}

export default Button;