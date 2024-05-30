import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import { Result, Failure } from '../../util/result';
import { Course } from '../../models/course';
import GlobalStyles from '../../Global.module.css';
import { SearchForm } from '../../components/composite';
import { HStack, VStack, Typography } from '../../components';
import { CourseSearchAPI, CourseSearchFailure } from '../../api/course/search';

import SingleSearchResultView from './SingleSearchResultView';
import lecturesStyles from './Lectures.module.css';
import styles from './common.module.css';

type SearchResult = Result<Course[], CourseSearchFailure>;

const SearchTopView = ({ query }: { query: string }) => {
  return query ? (
    <VStack
      gap="20px"
      className={styles.borderBottom}
      style={{
        padding: '110px 40px 110px 40px',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="t3" style={{ wordBreak: 'break-word' }}>
        <Typography variant="t1" children={`"${query}"`}></Typography> 강의 검색 결과
      </Typography>

      <SearchForm className={lecturesStyles.searchForm} defaultValue={query} />
    </VStack>
  ) : (
    <VStack
      className={styles.borderBottom}
      style={{
        padding: '110px 40px 110px 40px',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      <SearchForm className={lecturesStyles.searchForm} defaultValue={query} />
    </VStack>
  );
};

const SearchResultsView = ({ query, results }: { query: string; results: SearchResult }) => {
  if (results.isSuccess()) {
    return (
      <HStack className={`${styles.results} ${GlobalStyles.metacontainer}`}>
        <div className={lecturesStyles.container}>
          {results.unwrap().map((course) => (
            <SingleSearchResultView course={course} />
          ))}
        </div>
      </HStack>
    );
  }

  const err = results.unwrapError();

  return (
    <HStack className={styles.results} style={{ padding: '40px', flexGrow: 1, textAlign: 'center' }}>
      <Typography variant="t2">
        {
          // eslint-disable-next-line no-nested-ternary
          query === ''
            ? '강의명, 학수번호, 교수명으로 검색할 수 있습니다.'
            : // eslint-disable-next-line no-nested-ternary
              err === CourseSearchFailure.INIT
              ? '검색 중입니다.'
              : // eslint-disable-next-line no-nested-ternary
                err === CourseSearchFailure.NO_AUTH
                ? '권한이 없습니다. 로그인하세요'
                : // eslint-disable-next-line no-nested-ternary
                  err === CourseSearchFailure.NO_RESULT
                  ? '결과가 없습니다.'
                  : // eslint-disable-next-line no-nested-ternary
                    err === CourseSearchFailure.BAD_REQUEST
                    ? '너무 짧은 검색어입니다.'
                    : '?'
        }
      </Typography>
    </HStack>
  );
};

export function SearchPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('q') || '';

  const [searchResult, setSearchResult] = useState<SearchResult>(new Failure(CourseSearchFailure.INIT));

  useEffect(() => {
    if (query !== '') {
      setTimeout(() => {
        CourseSearchAPI({ keyword: query })
          .then((cs: SearchResult) => {
            setSearchResult(cs);
          })
          .catch((uncaught: AxiosError) => {
            console.log('[Uncaught Axios Error] : ', uncaught);
          });
      }, 0);
    }
  }, []);

  return (
    <HStack style={{ height: '100%' }}>
      <SearchTopView query={query} />
      <SearchResultsView query={query} results={searchResult} />
    </HStack>
  );
}
