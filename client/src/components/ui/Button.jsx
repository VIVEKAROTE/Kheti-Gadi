import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'px-4 py-2 rounded-xl font-bold transition duration-300 flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark',
    secondary: 'bg-secondary text-white hover:bg-yellow-600',
    outline: 'border-2 border-primary text-primary hover:bg-green-50',
    ghost: 'text-gray-600 hover:bg-gray-100',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
