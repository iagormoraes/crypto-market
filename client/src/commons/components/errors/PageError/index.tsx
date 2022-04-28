export default function PageError({ error }: { error?: string | string[] }) {
  if (!error) return null;

  // Get the first error on the list of errors when array
  const errorLabel = Array.isArray(error) ? error[0] : error;

  const errors: Record<string, string> = {
    'Not Found': `Sorry, we couldn't find the requested resource, try again.`,
  };

  if (!errors[errorLabel]) return null;

  return (
    <p className="my-4 text-red-500 font-bold text-center">
      {errors[errorLabel]}
    </p>
  );
}
