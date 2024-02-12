import React from 'react';
import {FlatList} from 'react-native';

const MemoizedFlatList = React.memo(({data, renderItem, keyExtractor}) => (
  <FlatList data={data} renderItem={renderItem} keyExtractor={keyExtractor} />
));

export default MemoizedFlatList;
