import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const App = () => {
  return (
        <View style={style.container}>
            <Text>ddddd</Text>
          
        </View>
  );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        color: 'blue',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
    },
});
export default App;
