import React from 'react';

export default function InputError({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="text-red-600 font-bold mb-2">{children}</div>;
}
