export default function Select<T extends string>({
  items,
  handleValue,
  value,
}: {
  items: readonly SelectOpts<T>[];
  handleValue?: React.FormEventHandler<HTMLInputElement>;
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
              : 'light:!text-light-fore-10 dark:!text-dark-fore-10 light:!bg-light-back-1 dark:!bg-dark-back-1 light:!border-light-back-4 dark:!border-dark-back-4'
          }`}
          htmlFor={v.value}
        >
          {v.label}
          <input
            hidden
            type="radio"
            id={v.value}
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
