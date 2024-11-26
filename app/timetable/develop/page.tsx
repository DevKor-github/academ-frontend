'use client';

import Button from '@/components/basic/button';
import SearchForm from '@/components/composite/SearchForm';
import React, { useState } from 'react';
import { BookmarksTimetableView } from './BookmarksTimetableView';

// 강의 정보 타입 정의
interface Lecture {
  id: number; // 고유 ID
  title: string;
  professor: string;
  rating: number;
  time: string; // "1:30 - 5:30"
  room: string;
  day: number; // 요일 (0: 월요일 ~ 6: 일요일)
  startRow: number; // 시간표에서 시작하는 행
  endRow: number; // 시간표에서 끝나는 행
}

const Timetable: React.FC = () => {
  // 시간표 데이터 (42개의 빈 셀)
  const [timetable, setTimetable] = useState<(Lecture | null)[]>(Array(42).fill(null));

  // 시간표에 강의를 추가하는 함수
  const addLectureToTimetable = (lecture: Lecture) => {
    const newTimetable = [...timetable];
    const startIndex = lecture.day + 7 * (lecture.startRow - 1);
    const endIndex = lecture.day + 7 * (lecture.endRow - 1);

    // 시간표 중복 검사
    for (let i = startIndex; i <= endIndex; i += 7) {
      if (newTimetable[i] !== null) {
        alert('이미 해당 시간에 다른 강의가 있습니다!');
        return;
      }
    }

    // 강의를 시간표에 추가
    for (let i = startIndex; i <= endIndex; i += 7) {
      newTimetable[i] = lecture;
    }

    setTimetable(newTimetable);
    alert(`${lecture.title} 강의가 시간표에 추가되었습니다.`);
  };

  return (
    <div className="flex w-full overflow-hidden">
      {/* 시간표 영역 */}
      <div className="flex-1 p-6">
        <h2 className="text-xl font-bold mb-4">2024년도 시간표(희망편)</h2>
        <div className="grid grid-cols-7 grid-rows-6 border border-gray-300">
          {timetable.map((cell, index) => (
            <div key={index} className="border border-gray-200 h-20 flex items-center justify-center">
              {cell ? (
                <div className="text-center text-sm">
                  <p className="font-bold">{cell.title}</p>
                  <p>{cell.professor}</p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <Button onClick={() => addLectureToTimetable}>추가</Button>
      </div>

      {/* 강의 리스트 영역 */}
      <div className="min-w-96 p-6 light:bg-base-31 dark:bg-base-2">
        <Button kind="outline" className="text-primary-500 rounded-full px-4 py-0 justify-self-end">
          수정하기
        </Button>
        <SearchForm />
        <div className="flex gap-6 items-center mb-4 px-4">
          <h3 className="text-lg font-bold">내 관심강의</h3>
          <h3 className="text-lg font-bold">검색결과</h3>
        </div>

        <BookmarksTimetableView />
      </div>
    </div>
  );
};

export default Timetable;
