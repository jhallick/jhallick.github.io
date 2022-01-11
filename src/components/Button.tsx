import { Link } from '@reach/router';
import React from 'react';

export type ButtonType = 'primary' | 'secondary' | 'link';

export interface ButtonProps {
  text: string;
  type: ButtonType;
  className?: string;
  to: string;
}

const Button: React.FC<ButtonProps> = ({ text, type, className, to }) => {
  return (
    <Link className={`button button-${type} ${className}`} to={to}>
      {text}
    </Link>
  );
}

export default Button;