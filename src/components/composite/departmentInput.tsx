import Input from '../basic/input';

export default function DepartmentInput({
  input,
  department,
}: {
  input: UpdateProfileReq;
  department: DepartmentInputProps;
}) {
  const changeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    department.setInput({
      ...input,
      [event.target.id]: value,
    });
    department.setDropDownItemIndex(-1);
    department.setIsDropDown(true);
  };

  const clickDropDownItem = (clickedItem: string) => {
    department.setInput({
      ...input,
      department: clickedItem,
    });
  };

  const handleDropDownKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (department.isDropDown) {
      if (event.key === 'ArrowDown' && department.dropDownList.length - 1 > department.dropDownItemIndex) {
        department.setDropDownItemIndex(department.dropDownItemIndex + 1);
      }

      if (event.key === 'ArrowUp' && department.dropDownItemIndex > 0) {
        department.setDropDownItemIndex(department.dropDownItemIndex - 1);
      }

      if (event.key === 'Enter' && department.dropDownItemIndex >= 0) {
        event.preventDefault();
        clickDropDownItem(department.dropDownList[department.dropDownItemIndex]);
        department.setDropDownItemIndex(-1);
        department.setIsDropDown(false);
      }
    }
  };

  return (
    <div
      onBlur={() => {
        department.setDropDownItemIndex(-1);
        department.setIsDropDown(false);
      }}
      className="w-full"
    >
      <Input
        required
        type="text"
        id="department"
        placeholder="학과"
        autoComplete="off"
        value={input.department}
        onChange={changeInputValue}
        onKeyDown={handleDropDownKey}
        onFocus={() => {
          department.setIsDropDown(true);
        }}
        style={department.isDropDown ? { borderRadius: '0.5rem 0.5rem 0 0' } : { borderRadius: '0.5rem' }}
        className="w-full"
      />
      {department.isDropDown && (
        <ul className="block m-0 p-2 light:bg-white border light:border-base-30 dark:bg-neutral-900 dark:border-base-2 rounded-b-lg z-10">
          {department.dropDownList.length === 0 && <li className="p-2 text-gray-500">해당하는 단어가 없습니다</li>}
          {department.dropDownList.map((dropDownItem, dropDownIndex) => (
            <li
              key={dropDownIndex}
              onMouseDown={() => {
                clickDropDownItem(dropDownItem);
                department.setDropDownItemIndex(-1);
                department.setIsDropDown(false);
              }}
              onMouseOver={() => department.setDropDownItemIndex(dropDownIndex)}
              className={`p-2 cursor-pointer ${dropDownIndex === department.dropDownItemIndex ? 'light:bg-gray-300 dark:bg-gray-700' : ''}`}
            >
              {dropDownItem}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
