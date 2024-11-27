export default function TempAlert({
  children,
  closeButton,
}: {
  children: React.ReactNode;
  closeButton: React.ReactNode;
}) {
  return (
    <div className="m-8 p-4 rounded-xl bg-primary-400 bg-opacity-5 border border-primary-500 flex flex-row justify-between ">
      <span>{children}</span>
      <div>{closeButton}</div>
    </div>
  );
}
