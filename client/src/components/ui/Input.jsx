import React, { forwardRef } from 'react';

const Input = forwardRef(({ label, id, error, className = '', ...props }, ref) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-primary outline-none transition duration-200 ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
