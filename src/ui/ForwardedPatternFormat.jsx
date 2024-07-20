import React from 'react';
import { PatternFormat } from 'react-number-format';

// eslint-disable-next-line react/display-name
const ForwardedPatternFormat = React.forwardRef((props, ref) => (
  <PatternFormat {...props} type="tel" getInputRef={ref} autoComplete="on" />
));

export default ForwardedPatternFormat;
