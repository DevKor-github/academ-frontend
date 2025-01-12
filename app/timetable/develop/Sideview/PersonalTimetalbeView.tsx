import Button from '@/components/basic/button';
import Input from '@/components/basic/input';
import { HStack, VStack } from '@/components/basic/stack';
import Select from '@/components/basic/select';
import { useState } from 'react';

export function PersonalTimetableView() {
  const [input, setInput] = useState({
    title: '',
    day: '',
    startTime: '09:00',
    endTime: '10:00',
    location: '',
    memo: '',
    class: '',
  });

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setInput({
      ...input,
      [event.target.id]: value,
    });
  }

  //   function handleAddPersonal() {
  //     // Add personal timetable
  //     // StartTime, EndTime을 Hour, Minute로 나누어서 저장
  //   }

  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const [dropDownItemIndex, setDropDownItemIndex] = useState<number>(-1);
  const [isDropDown, setIsDropDown] = useState<boolean>(false);

  const changeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInput({
      ...input,
      [event.target.id]: value,
    });
    setDropDownItemIndex(-1);
    setIsDropDown(true);
  };

  const clickDropDownItem = (clickedItem: string) => {
    setInput({
      ...input,
      day: clickedItem,
    });
  };

  const handleDropDownKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isDropDown) {
      if (event.key === 'ArrowDown' && days.length - 1 > dropDownItemIndex) {
        setDropDownItemIndex(dropDownItemIndex + 1);
      }

      if (event.key === 'ArrowUp' && dropDownItemIndex >= 0) {
        setDropDownItemIndex(dropDownItemIndex - 1);
      }

      if (event.key === 'Enter' && dropDownItemIndex >= 0) {
        event.preventDefault();
        clickDropDownItem(days[dropDownItemIndex]);
        setDropDownItemIndex(-1);
        setIsDropDown(false);
      }
    }
  };

  return (
    <form
      onSubmit={() => ({
        /* handleAddPersonal */
      })}
    >
      <HStack className="p-6 bg-white rounded-lg border border-gray-200 gap-4">
        <div className="text-black text-lg font-semibold">강의명</div>
        <Input required id="title" placeholder={input.title} onChange={handleInput} className="w-full" />
        <div className="text-black text-lg font-semibold">분류</div>
        <Select
          id="class"
          value={input.class}
          handleValue={handleInput}
          items={[
            { value: 'SEMINAR', label: '세미나' },
            { value: 'WORK', label: '출근' },
            { value: 'ASSISTANT', label: '조교' },
            { value: 'STUDY', label: '스터디' },
            { value: 'ETC', label: '기타' },
          ]}
        />
        <div className="text-black text-lg font-semibold">시간</div>
        <VStack className="w-full gap-2 justify-between">
          <div
            onBlur={() => {
              setDropDownItemIndex(-1);
              setIsDropDown(false);
            }}
            className="w-14"
          >
            <Input
              required
              type="text"
              id="day"
              placeholder="요일"
              autoComplete="off"
              value={input.day}
              onChange={changeInputValue}
              onKeyDown={handleDropDownKey}
              onFocus={() => {
                setIsDropDown(true);
              }}
              style={isDropDown ? { borderRadius: '0.5rem 0.5rem 0 0' } : { borderRadius: '0.5rem' }}
              className="w-full text-center"
            />
            {isDropDown && (
              <ul className="block text-center m-0 p-2 light:bg-white border light:border-base-30 dark:bg-neutral-900 dark:border-base-2 rounded-b-lg z-10">
                {days.map((dropDownItem, dropDownIndex) => (
                  <li
                    key={dropDownIndex}
                    onMouseDown={() => {
                      clickDropDownItem(dropDownItem);
                      setDropDownItemIndex(-1);
                      setIsDropDown(false);
                    }}
                    onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                    className={`p-2 cursor-pointer ${dropDownItemIndex === dropDownIndex ? 'light:bg-gray-300 dark:bg-gray-700' : ''}`}
                  >
                    {dropDownItem}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <VStack className="gap-2 h-min items-center">
            <Input
              required
              type="time"
              id="startTime"
              value={input.startTime}
              onChange={handleInput}
              className="w-36"
            />
            <span>-</span>
            <Input required type="time" id="endTime" value={input.endTime} onChange={handleInput} className="w-36" />
          </VStack>
        </VStack>

        <div className="text-black text-lg font-semibold">장소</div>
        <Input required id="location" placeholder={input.location} onChange={handleInput} className="w-full" />
        <div className="text-black text-lg font-semibold">메모</div>
        <Input required id="memo" placeholder={input.memo} onChange={handleInput} className="w-full" />
        <Button kind="filled" className="">
          시간표에 추가하기
        </Button>
      </HStack>
    </form>
  );
}
