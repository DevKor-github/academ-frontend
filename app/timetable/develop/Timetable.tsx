import React from 'react';

type Lecture = {
  title: string;
  professor: string;
  timeLocations: TimeLocation[];
};

type TimeLocation = {
  day: string; // '월', '화', '수', '목', '금', etc.
  startPeriod: number;
  endPeriod: number;
  location: string;
};

type TimetableProps = {
  lectures: Lecture[];
  personals: Personal[];
};

type HighlightedLectureProps = {
  keyValue: number;
  lecture: Lecture;
  dayCount: number;
};

type Personal = {
  title: string;
  day: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  location: string;
  memo: string;
};

type HighlightedPersonalProps = {
  keyValue: number;
  personal: Personal;
  dayCount: number;
};

const theme = ['#FEF7F8', '#FFA3B0', '#E65A76', '#DC143C', '#A51330'];

const baseDays = ['월', '화', '수', '목', '금', '토', '일'];
const classStart = [8, 9, 10.5, 12, 13.5, 15, 16.5, 18, 19, 20, 21];
const classEnd = [8.85, 10.25, 11.75, 13.25, 14.75, 16.25, 17.75, 18.85, 19.85, 20.85, 21.85];

const HighlightedLecture: React.FC<HighlightedLectureProps> = ({ keyValue, lecture, dayCount }) => {
  const { title, professor, timeLocations } = lecture;

  return (
    <>
      {timeLocations.map((timeLocation, idx) => {
        const { day, startPeriod, endPeriod, location } = timeLocation;
        const start = classStart[startPeriod];
        const end = classEnd[endPeriod];
        const top = `calc((${(start - 9) * 3.5}rem) + 1px)`;
        const height = `calc((${(end - start) * 3.5}rem) - 1px)`;
        const dayIndex = baseDays.indexOf(day);

        return (
          <div
            key={idx}
            className="absolute p-2 left-[1px] text-black text-xs"
            style={{
              top,
              height,
              width: `calc((100% - 2rem) / ${dayCount} - 1px)`,
              marginLeft: `calc((100% - 2rem) / ${dayCount} * ${dayIndex} + 2rem)`,
              backgroundColor: theme[keyValue % theme.length],
            }}
          >
            <div className="break-normal">
              <div className="font-bold mb-1">{title}</div>
              <div>{professor}</div>
              <div>{location}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

const HighlightedPersonal: React.FC<HighlightedPersonalProps> = ({ keyValue, personal, dayCount }) => {
  const { title, day, startHour, startMinute, endHour, endMinute, location, memo } = personal;
  const start = startHour + startMinute / 60;
  const end = endHour + endMinute / 60;
  const top = `calc((${(start - 9) * 3.5}rem) + 1px)`;
  const height = `calc((${(end - start) * 3.5}rem) - 1px)`;
  const dayIndex = baseDays.indexOf(day);

  return (
    <>
      <div
        className="absolute p-2 left-[1px] text-black text-xs"
        style={{
          top,
          height,
          width: `calc((100% - 2rem) / ${dayCount} - 1px)`,
          marginLeft: `calc((100% - 2rem) / ${dayCount} * ${dayIndex} + 2rem)`,
          backgroundColor: theme[keyValue % theme.length],
        }}
      >
        <div className="break-normal">
          <div className="font-bold mb-1">{title}</div>
          <div>{location}</div>
          <div>{memo}</div>
        </div>
      </div>
    </>
  );
};

const Timetable: React.FC<TimetableProps> = ({ lectures, personals }) => {
  // 강의 데이터를 기반으로 추가 요일 확인
  const usedDays = Array.from(new Set(lectures.flatMap((lecture) => lecture.timeLocations.map((tl) => tl.day))));
  const days = usedDays.includes('일')
    ? baseDays
    : usedDays.includes('토')
      ? baseDays.slice(0, 6)
      : baseDays.slice(0, 5);

  // 가장 큰 endPeriod 찾기
  const maxEndPeriod = Math.max(
    ...lectures.flatMap((lecture) => lecture.timeLocations.map((tl) => tl.endPeriod)),
    5, // 기본 17시까지 (index 6)
  );

  // 동적으로 시간 계산
  const hourRange = Math.ceil(classEnd[maxEndPeriod] - 9);
  const hours = Array.from({ length: hourRange }, (_, i) => 9 + i);

  return (
    <div className="w-full border border-gray-200 rounded-2xl">
      {/* 헤더 */}
      <div className={`grid grid-cols-[2rem_repeat(auto-fit,_minmax(30px,_1fr))] rounded-2xl`}>
        <div className="h-10 flex items-center justify-center border-gray-200 font-bold">{/* 빈 칸 */}</div>
        {days.map((day, idx) => (
          <div key={idx} className="h-10 flex items-center justify-center border-l border-gray-200 font-bold">
            {day}
          </div>
        ))}
      </div>
      {/* 본문 */}
      <div className="relative">
        {hours.map((hour) => (
          <div
            key={hour}
            className={`grid grid-cols-[2rem_repeat(auto-fit,_minmax(30px,_1fr))] h-14 border-t border-gray-200`}
          >
            <div className="flex items-start justify-end pr-1 border-gray-200 text-sm text-gray-600">{`${hour}`}</div>
            {days.map((_, idx) => (
              <div key={idx} className="border-l border-gray-200" />
            ))}
          </div>
        ))}
        {lectures.map((lecture, index) => (
          <HighlightedLecture key={index} keyValue={index} lecture={lecture} dayCount={days.length} />
        ))}
        {personals.map((personal, index) => (
          <HighlightedPersonal
            key={index}
            keyValue={index + lectures.length}
            personal={personal}
            dayCount={days.length}
          />
        ))}
      </div>
    </div>
  );
};

export default Timetable;
