/**
 * Accessibility Enhancement Utilities
 * Provides utilities for improving accessibility across the app
 */

/**
 * Add keyboard navigation support to a component
 * Supports Tab, Enter, Escape, and Arrow keys
 */
export const useKeyboardNavigation = (ref, callbacks = {}) => {
  const {
    onEnter = () => {},
    onEscape = () => {},
    onArrowUp = () => {},
    onArrowDown = () => {},
    onArrowLeft = () => {},
    onArrowRight = () => {},
  } = callbacks;

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        onEnter(event);
        break;
      case 'Escape':
        event.preventDefault();
        onEscape(event);
        break;
      case 'ArrowUp':
        event.preventDefault();
        onArrowUp(event);
        break;
      case 'ArrowDown':
        event.preventDefault();
        onArrowDown(event);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        onArrowLeft(event);
        break;
      case 'ArrowRight':
        event.preventDefault();
        onArrowRight(event);
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    const element = ref?.current;
    if (element) {
      element.addEventListener('keydown', handleKeyDown);
      return () => element.removeEventListener('keydown', handleKeyDown);
    }
  }, [ref, callbacks]);
};

/**
 * Generate accessible ARIA labels for common elements
 */
export const generateAriaLabel = (type, data = {}) => {
  const labels = {
    button: `Button: ${data.label || 'Action'}`,
    link: `Link: ${data.label || 'Navigation'}`,
    modal: `Modal: ${data.title || 'Dialog'}`,
    alert: `Alert: ${data.message || 'Alert'}`,
    menu: `Menu: ${data.name || 'Navigation menu'}`,
    tab: `Tab: ${data.name || 'Tab'} (${data.active ? 'selected' : 'not selected'})`,
    input: `Input: ${data.label || 'Text field'} (${data.required ? 'required' : 'optional'})`,
  };

  return labels[type] || `Element: ${type}`;
};

/**
 * Announce changes to screen readers
 */
export const announceChange = (message, priority = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.style.position = 'absolute';
  announcement.style.left = '-10000px';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * Check if an element is visible to screen readers
 */
export const isAriaHidden = (element) => {
  return element.getAttribute('aria-hidden') === 'true';
};

/**
 * Trap focus within a modal or dialog
 */
export const trapFocus = (ref) => {
  React.useEffect(() => {
    const element = ref?.current;
    if (!element) return;

    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable?.focus();
          e.preventDefault();
        }
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    firstFocusable?.focus();

    return () => element.removeEventListener('keydown', handleKeyDown);
  }, [ref]);
};

/**
 * Test component accessibility
 */
export const testAccessibility = () => {
  const issues = [];

  // Check for images without alt text
  document.querySelectorAll('img').forEach(img => {
    if (!img.alt) {
      issues.push(`Image missing alt text: ${img.src}`);
    }
  });

  // Check for buttons without accessible names
  document.querySelectorAll('button').forEach(btn => {
    const text = btn.textContent?.trim();
    const ariaLabel = btn.getAttribute('aria-label');
    if (!text && !ariaLabel) {
      issues.push('Button without accessible name');
    }
  });

  // Check for form inputs without labels
  document.querySelectorAll('input, textarea, select').forEach(input => {
    const label = document.querySelector(`label[for="${input.id}"]`);
    const ariaLabel = input.getAttribute('aria-label');
    if (!label && !ariaLabel) {
      issues.push(`Input without label: ${input.name || input.id}`);
    }
  });

  // Check for color contrast
  document.querySelectorAll('[style*="color"]').forEach(el => {
    const style = window.getComputedStyle(el);
    // Simplified check - in production use proper contrast checker
    console.log('Consider checking contrast for:', el);
  });

  return issues;
};

export default {
  generateAriaLabel,
  announceChange,
  isAriaHidden,
  testAccessibility,
};
