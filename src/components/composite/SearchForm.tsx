// import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

import { VStack } from '../base/Stack';
import { MagnifyIcon } from '../../icons';

import styles from './SearchForm.module.css';

interface SearchFormProp {
  defaultValue?: string;
}

export default function SearchForm({ defaultValue }: SearchFormProp) {
  const [query, setQuery] = useState(defaultValue || '');

  return (
    <form method="get" action="/lecture" style={{ padding: '20px 0px' }}>
      <VStack gap="20px" className={styles.searchBox}>
        <MagnifyIcon />
        <input
          required
          autoFocus
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
