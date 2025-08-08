import React, { useRef, useState } from 'react';
import { Dimensions, PanResponder } from 'react-native';
import { Canvas, Skia, useDrawCallback, SkPath, PaintStyle } from '@shopify/react-native-skia';

const { width, height } = Dimensions.get('window');

interface DrawingCanvasProps {
  color: string;
  strokeWidth: number;
  mode: 'draw' | 'erase';
}

export default function DrawingCanvas({ color, strokeWidth, mode }: DrawingCanvasProps) {
  const [paths, setPaths] = useState<{ path: SkPath; color: string; strokeWidth: number }[]>([]);
  const currentPathRef = useRef<SkPath | null>(null);

  const drawCallback = useDrawCallback((canvas) => {
    paths.forEach(({ path, color, strokeWidth }) => {
      const paint = Skia.Paint();
      paint.setAntiAlias(true);
      paint.setStyle(PaintStyle.Stroke);
      paint.setStrokeWidth(strokeWidth);
      paint.setColor(Skia.Color(color));
      canvas.drawPath(path, paint);
    });
  }, [paths]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;

        if (mode === 'erase') {
          setPaths(prev => prev.filter(({ path }) => {
            const bounds = path.getBounds();
            return !(
              locationX >= bounds.left && locationX <= bounds.right &&
              locationY >= bounds.top && locationY <= bounds.bottom
            );
          }));
          return;
        }

        const newPath = Skia.Path.Make();
        newPath.moveTo(locationX, locationY);
        currentPathRef.current = newPath;
        setPaths((prev) => [...prev, { path: newPath, color, strokeWidth }]);
      },
      onPanResponderMove: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        currentPathRef.current?.lineTo(locationX, locationY);
      },
      onPanResponderRelease: () => {
        currentPathRef.current = null;
      },
    })
  ).current;

  return (
    <Canvas style={{ width, height }} onDraw={drawCallback} {...panResponder.panHandlers} />
  );
}
