'use client';

import Button from '@/components/basic/button';
import React, { useState } from 'react';
// import { BookmarksTimetableView } from './BookmarksTimetableView';
import { TimetableSearchView } from './TimetableSearchView';
import Timetable from './Timetable';

const lectures = [
  {
    title: '4D 컴퓨터그래픽',
    professor: '홍길동 교수',
    timeLocations: [
      {
        day: '월',
        startPeriod: 2,
        endPeriod: 5,
        location: '교양관 606호',
      },
      {
        day: '금',
        startPeriod: 3,
        endPeriod: 6,
        location: '교양관 606호',
      },
    ],
  },
];

type TimetableView = 'DEPARTMENT' | 'BOOKMARKS' | 'SEARCH' | 'PERSONAL';

const Timetablepage: React.FC = () => {
  const [view, setView] = useState<TimetableView>('BOOKMARKS');

  return (
    <div className="flex w-full overflow-hidden">
      {/* 시간표 영역 */}
      <div className="flex-1 p-6">
        <h2 className="text-xl font-bold mb-4">2024년도 시간표(희망편)</h2>
        <Timetable lectures={lectures} />
      </div>

      {/* 강의 리스트 영역 */}
      <div className="min-w-96 p-6 light:bg-neutral-100 dark:bg-neutral-800">
        <Button kind="outline" className="text-primary-500 rounded-full px-4 py-0 justify-self-end">
          수정하기
        </Button>
        <div className="flex gap-6 items-center mb-4 px-4">
          <span
            className={`text-lg font-bold ${
              view === 'DEPARTMENT'
                ? '!text-primary-500 border-b-4 border-neutral-400'
                : 'light:!text-base-10 dark:!text-base-20'
            }`}
            onClick={() => setView('DEPARTMENT')}
          >
            내 전공강의
          </span>
          <span
            className={`text-lg font-bold ${
              view === 'BOOKMARKS'
                ? '!text-primary-500 border-b-4 border-neutral-400'
                : 'light:!text-base-10 dark:!text-base-20'
            }`}
            onClick={() => setView('BOOKMARKS')}
          >
            내 책갈피
          </span>
          <span
            className={`text-lg font-bold ${
              view === 'SEARCH'
                ? '!text-primary-500 border-b-4 border-neutral-400'
                : 'light:!text-base-10 dark:!text-base-20'
            }`}
            onClick={() => setView('SEARCH')}
          >
            검색결과
          </span>
          <span
            className={`text-lg font-bold ${
              view === 'PERSONAL'
                ? '!text-primary-500 border-b-4 border-neutral-400'
                : 'light:!text-base-10 dark:!text-base-20'
            }`}
            onClick={() => setView('PERSONAL')}
          >
            개인일정
          </span>
        </div>

        <TimetableSearchView />

        {/* {view === 'DEPARTMENT' ? (
          <DepartmentTimetableView />
        ) : view === 'SEARCH' ? (
          <SearchTimetableView />
        ) : view === 'PERSONAL' ? (
          <PersonalTimetableView />
        ) : (
          <BookmarksTimetableView />
        )} */}
      </div>
    </div>
  );
};

export default Timetablepage;
