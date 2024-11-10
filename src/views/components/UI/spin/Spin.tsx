import { memo, useCallback } from 'react';
import './spin.scss';

function Spin({ size = 'default' }: { size?: 'default' | 'small' | 'large' }) {
  const getSize = useCallback(() => {
    switch (size) {
      case 'small':
        return 'double-spin-small';
      case 'large':
        return 'double-spin-large';
      default:
        return 'double-spin';
    }
  }, [size]);
  return <span className={getSize()}></span>;
}

export default memo(Spin);
