export default function Select<T extends string>({
  name,
  items,
  handleValue,
  value,
}: {
  name?: string;
  items: readonly SelectOpts<T>[];
  handleValue: React.FormEventHandler<HTMLInputElement> | undefined;
  value: T;
}) {
  return (
    <div className="flex flex-row text-sm gap-2">
      {items.map((v) => (
        <label
          key={v.label}
          className={`!border !rounded-full px-4 p-2 cursor-pointer ${
            value === v.value
              ? '!text-primary-500 !bg-primary-500/10 !border-primary-500'
              : 'light:!text-base-10 dark:!text-base-20 light:!bg-base-31 dark:!bg-base-1 light:!border-base-28 dark:!border-base-4'
          }`}
          htmlFor={v.value}
        >
          {v.label}
          <input
            hidden
            type="radio"
            id={v.value}
            name={name}
            value={v.value}
            checked={value === v.value}
            onChange={handleValue}
            readOnly={handleValue === undefined}
          />
        </label>
      ))}
    </div>
  );
}
