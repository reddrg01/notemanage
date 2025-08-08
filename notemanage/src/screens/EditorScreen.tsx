import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Button, IconButton } from 'react-native-paper';
import DrawingCanvas from '../components/DrawingCanvas';

export default function EditorScreen({ navigation }) {
  const [color, setColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [mode, setMode] = useState<'draw' | 'erase'>('draw');

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Notebook Editor" />
      </Appbar.Header>
      <View style={styles.toolbar}>
        <IconButton icon="pencil" onPress={() => setMode('draw')} />
        <IconButton icon="eraser" onPress={() => setMode('erase')} />
        <Button onPress={() => setColor('#000000')}>Black</Button>
        <Button onPress={() => setColor('#ff0000')}>Red</Button>
        <Button onPress={() => setStrokeWidth(2)}>Thin</Button>
        <Button onPress={() => setStrokeWidth(6)}>Thick</Button>
      </View>
      <DrawingCanvas color={color} strokeWidth={strokeWidth} mode={mode} />
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 4,
    backgroundColor: '#eee',
  },
});
