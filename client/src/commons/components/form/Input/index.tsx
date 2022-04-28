import { HTMLAttributes } from 'react';
import classnames from 'classnames';
import { FieldInputProps } from 'formik';

interface Props extends HTMLAttributes<HTMLInputElement> {
  field: FieldInputProps<string>;
  form: string;
}

export default function Input({ field, form, ...props }: Props) {
  return (
    <div className="flex flex-col mb-4">
      <label className="text-white capitalize text-lg mb-2">{field.name}</label>
      <input
        {...field}
        {...props}
        className={classnames(
          'px-2 py-4 rounded font-bold text-gray-600 text-xl',
          props.className,
        )}
      />
    </div>
  );
}
