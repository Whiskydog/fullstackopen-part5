import { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';

const Toggle = forwardRef(({ label, children }, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({ toggle: () => setVisible(!visible) }));

  return visible ? (
    <div>
      {children}
      <button onClick={() => setVisible(false)}>Cancel</button>
    </div>
  ) : (
    <button onClick={() => setVisible(true)}>{label}</button>
  );
});

Toggle.displayName = 'Toggle';
Toggle.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Toggle;
