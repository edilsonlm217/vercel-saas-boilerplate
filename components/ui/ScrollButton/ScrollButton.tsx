import React, { ButtonHTMLAttributes } from 'react';
import { ArrowDown } from 'lucide-react';

interface ScrollButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { }

const ScrollButton: React.FC<ScrollButtonProps> = ({ ...props }) => (
  <button {...props}>
    <ArrowDown className="h-4 w-4" />
  </button>
);

export default ScrollButton;
