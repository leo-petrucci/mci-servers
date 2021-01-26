import React from 'react';
import RcTooltip from 'rc-tooltip';
import { TooltipProps } from 'rc-tooltip/lib/Tooltip';

const Tooltip = (props: TooltipProps): JSX.Element => <RcTooltip {...props} />;

Tooltip.defaultProps = {
  placement: ['top'],
};

export default Tooltip;
