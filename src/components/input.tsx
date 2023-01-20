import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TextInput, type TextInputProps } from '@mantine/core';
import { TbX } from 'react-icons/tb';

interface InputProps extends TextInputProps {
  controlled?: boolean;
  withRemoveButton?: boolean;
}

/**
 * Reusable text input component
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ controlled, withRemoveButton, value, onChange, ...props }, ref) => {
    // Initialize state for controlled input
    const [inputValue, setInputValue] = useState(controlled ? value : props.defaultValue);

    useEffect(() => {
      if (controlled) setInputValue(value);
    }, [controlled, value]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        let { value } = e.target;
        setInputValue(value);
        onChange && onChange(e);
      },
      [onChange]
    );

    const handleClear = useCallback(
      (e) => {
        setInputValue('');
        e.target.value = '';
        onChange && onChange(e);
      },
      [onChange]
    );

    const ClearButton = useMemo(() => {
      if (!inputValue) return null;

      return (
        <div role='button' className='animate-show p-0.5 hover:bg-slate-100' onClick={handleClear}>
          <TbX size={14} className='text-slate-600' />
        </div>
      );
    }, [handleClear, inputValue]);

    return <TextInput ref={ref} value={inputValue} onChange={handleChange} rightSection={ClearButton} {...props} />;
  }
);

Input.displayName = 'Input';

export default Input;
