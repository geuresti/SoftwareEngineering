import React from 'react';
import { StyleSheet, Text, View, FlatList, ImageBackground, Dimensions } from 'react-native';

const data = [
  { key: 'Player' }, { key: 'Player' }, { key: 'Player' }, { key: 'Player' }, { key: 'Player' }, 
  // { key: 'K' },
  // { key: 'L' },
];

const formatData = (data, numColumns) => {
  const numberRows = Math.floor(data.length / numColumns);

  let numberLastRow = data.length - (numberRows * numColumns);
  while (numberLastRow !== numColumns && numberLastRow !== 0) {
    data.push({ key: `blank-${numberLastRow}`, empty: true });
    numberLastRow++;
  }

  return data;
};

const numColumns = 3;
export default class App extends React.Component {
  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View
        style={styles.item}
      >
        <Text style={styles.itemText}>{item.key}</Text>
      </View>
    );
  };

  render() {
    return (
        
       
      <FlatList
        data={formatData(data, numColumns)}
        style={styles.container}
        renderItem={this.renderItem}
        numColumns={numColumns}
      />
      
     

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  item: {
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns, 
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
});
