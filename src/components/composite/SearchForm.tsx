// import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

import { VStack } from '../base/Stack';
import { MagnifyIcon } from '../../icons';

import styles from './SearchForm.module.css';

interface SearchFormProp {
  className?: string;
  defaultValue?: string;
  style?: React.CSSProperties;
  autoFocus?: boolean;
}

export default function SearchForm({ autoFocus, className, defaultValue, style }: SearchFormProp) {
  const [query, setQuery] = useState(defaultValue || '');

  const combinedStyle = {
    ...style,
    ...{ padding: '20px 0px' },
  };

  return (
    <form className={className} method="get" action="/lecture" style={combinedStyle}>
      <VStack gap="20px" className={styles.searchBox}>
        <MagnifyIcon />
        <input
          required
          autoFocus={autoFocus}
          className={styles.textarea}
          id="text"
          name="q"
          placeholder={'검색'}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            border: 'none',
            fontSize: '16px',
            padding: '20px 0px',
            background: 'none',
          }}
        />
        {/* <Button type="submit">검색</Button> */}
      </VStack>
    </form>
  );
}
