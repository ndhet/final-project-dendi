import React, { useEffect, useRef } from 'react';
import { emojiCursor } from '../../utils/emojiCursor';

const EmojiCursorEffect = () => {
  const cursorInstanceRef = useRef(null);

  useEffect(() => {
    const controller = emojiCursor({
      emoji: ["😀", "😂", "😆", "😊"], //["⭐", "✨", "💫", "🌟"]
      delay: 50,
    });

    if (controller && controller.init()) {
      cursorInstanceRef.current = controller; 
    }

    return () => {
      if (cursorInstanceRef.current && cursorInstanceRef.current.destroy) {
        cursorInstanceRef.current.destroy();
        cursorInstanceRef.current = null;
      }
    };
  }, []);

  return null;
};

export default EmojiCursorEffect;
