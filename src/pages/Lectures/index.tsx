import { StarIcon } from '../../icons';
import { Input, HStack, VStack, Typography } from '../../components';

import styles from './index.module.css';

const SearchTopView: React.FC<{ query: string }> = ({ query }) => {
  return (
    <VStack
      style={{
        margin: '110px 40px 0px 40px',
        padding: '0px 0px 110px 0px',
        alignItems: 'center',
        flexWrap: 'wrap',
        borderBottom: '1px solid #d4d4d4',
        justifyContent: 'space-between',
      }}
    >
      {`'${query}' 강의 검색 결과`}
      <Input label="검색창.." />
    </VStack>
  );
};

function SearchResultsView() {
  const searchResults = ['친절한', '뿌듯한', '과제량이 많은', '뿌듯한', '과제량이 많은'];

  return (
    <HStack className={styles.searchResults} style={{ padding: '40px', flexGrow: 1 }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 280px)',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          gridGap: '20px',
        }}
      >
        {searchResults.map(() => (
          <SingleSearchResultView />
        ))}
      </div>
    </HStack>
  );
}

function SingleSearchResultView() {
  return (
    <VStack
      style={{
        background: 'white',
        margin: '20px 0px',
        padding: '32px',
        border: '1px solid #b7b7b7',
        borderRadius: '20px',
        width: '280px',
      }}
    >
      <VStack
        gap="20px"
        style={{
          minWidth: 'fit-content',
          alignItems: 'center',
          padding: '0px 16px 0px 0px',
          borderRight: '1px solid #b7b7b7',
        }}
      >
        <VStack
          gap="5px"
          style={{
            minWidth: 'fit-content',
            alignItems: 'center',
          }}
        >
          <StarIcon style={{ width: '24px', height: '24px', aspectRatio: 1, color: '#dc143c', stroke: 'none' }} />
          <Typography variant="t1" children="5.0" />
        </VStack>
      </VStack>
    </VStack>
  );
}

export function LecturesPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('q');

  return (
    <HStack style={{ height: '100%' }}>
      <SearchTopView query={query || ''} />
      <SearchResultsView />
    </HStack>
  );
}
