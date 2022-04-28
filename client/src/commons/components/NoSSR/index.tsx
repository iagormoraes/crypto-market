import React, { useState, useLayoutEffect, useEffect } from 'react';

const useEnhancedEffect =
  typeof window !== 'undefined' && process.env.NODE_ENV !== 'test'
    ? useLayoutEffect
    : useEffect;

interface Props {
  children: any;
  defer?: boolean;
  fallback?: React.ReactNode | React.ReactNode[] | null;
}

export default function NoSSR({
  children,
  defer = false,
  fallback = null,
}: Props) {
  const [isMounted, setMountedState] = useState(false);

  useEnhancedEffect(() => {
    if (!defer) setMountedState(true);
  }, [defer]);

  useEffect(() => {
    if (defer) setMountedState(true);
  }, [defer]);

  return isMounted ? children : fallback;
}
