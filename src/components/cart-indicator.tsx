import React from 'react';
import { useGlobalStore } from '@/store';
import { cx } from '@/utils';

type CartIndicatorProps = React.ComponentProps<'span'>;

const CartIndicator = ({ className, ...props }: CartIndicatorProps) => {
  const {
    store: { totalCarts },
  } = useGlobalStore();

  return (
    <span
      className={cx(
        'rounded-full bg-red-500 text-white font-mono font-bold text-[9px] px-1 py-0.5 centered',
        className
      )}
      {...props}
    >
      {totalCarts}
    </span>
  );
};

export default CartIndicator;
