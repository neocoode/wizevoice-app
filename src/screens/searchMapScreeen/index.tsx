import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import * as St from './styles';

const SearchMapScreen = () => {
  const [search, setSearch] = useState('');

  return (
    <St.Container>
      <St.InputWrapper>
        <St.IconButton>
          <MaterialIcons name="search" size={22} color="#fff" style={{ opacity: 0.7 }} />
        </St.IconButton>
        <St.SearchInput
          placeholder="Pesquisar"
          placeholderTextColor="#bbb"
          value={search}
          onChangeText={setSearch}
        />
        <St.IconButton>
          <MaterialIcons name="mic" size={22} color="#fff" style={{ opacity: 0.7 }} />
        </St.IconButton>
      </St.InputWrapper>
    </St.Container>
  );
};

export default SearchMapScreen;
