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
    <div
      className={`alert alert-${type} d-flex align-items-center justify-content-between`}
      role="alert"
      style={{
        position: 'fixed',
        top: '60vh',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        minWidth: '250px',
        maxWidth: '90%',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        borderRadius: '8px',
        padding: '10px 16px',
        fontSize: '0.9rem',
      }}
    >
      <span>{message}</span>
      <button
        type="button"
        className="btn-close ms-3"
        onClick={() => setShow(false)}
        aria-label="Close"
      ></button>
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