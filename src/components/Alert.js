import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function Alert({ type, message, autoClose = true, duration = 3000 }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => setShow(false), duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration]);

  if (!show || !message) return null;

  return (
    <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
      {message}
      <button type="button" className="btn-close" onClick={() => setShow(false)} aria-label="Close"></button>
    </div>
  );
}

// Prop validation
Alert.propTypes = {
  type: PropTypes.oneOf(['success', 'danger', 'warning', 'info']).isRequired,
  message: PropTypes.string.isRequired,
  autoClose: PropTypes.bool,
  duration: PropTypes.number,
};