import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';

const FormField = ({
  label,
  name,
  type = 'text',
  value = '',
  onChange = () => {},
  onBlur = () => {},
  placeholder = '',
  error = '',
  hint = '',
  required = false,
  disabled = false,
  autoComplete = 'off',
  minLength = 0,
  maxLength = 255,
  pattern = '',
  validator = null,
  showCheckmark = false,
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    const val = e.target.value;
    setValidationError('');
    onChange(e);

    // Run custom validator if provided
    if (validator && val) {
      const result = validator(val);
      if (result !== true) {
        setValidationError(result);
      }
    }
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur(e);

    // Validate on blur
    if (validator && e.target.value) {
      const result = validator(e.target.value);
      if (result !== true) {
        setValidationError(result);
      }
    }
  };

  const inputType =
    type === 'password' && showPassword ? 'text' : type;
  const hasError = error || validationError;
  const isValid = !hasError && value && showCheckmark;

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-semibold text-slate-900 dark:text-white"
        >
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          minLength={minLength}
          maxLength={maxLength}
          pattern={pattern}
          aria-label={label}
          aria-required={required}
          aria-invalid={!!hasError}
          aria-describedby={hasError ? `${name}-error` : hint ? `${name}-hint` : undefined}
          className={`w-full px-4 py-3 border-2 rounded-lg transition-smooth font-medium placeholder:text-slate-500 focus:outline-none ${
            hasError
              ? 'border-red-500 bg-red-50 dark:bg-red-900/20 focus:border-red-600'
              : isValid
              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 focus:border-emerald-600'
              : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:border-sky-600 dark:focus:border-sky-400'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />

        {/* Password Toggle */}
        {type === 'password' && value && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-smooth"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}

        {/* Status Icons */}
        {hasError && (
          <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-600 pointer-events-none" />
        )}
        {isValid && (
          <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600 pointer-events-none" />
        )}
      </div>

      {/* Error Message */}
      {hasError && (
        <div
          id={`${name}-error`}
          className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
          role="alert"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{hasError}</span>
        </div>
      )}

      {/* Helper Text */}
      {hint && !hasError && (
        <p id={`${name}-hint`} className="text-xs text-slate-600 dark:text-slate-400">
          {hint}
        </p>
      )}

      {/* Character Count */}
      {maxLength && value && (
        <div className="text-xs text-slate-500 dark:text-slate-400 text-right">
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  );
};

export default FormField;
