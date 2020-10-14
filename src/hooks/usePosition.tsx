import { useEffect, useState } from 'react';

const usePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const update = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY })
    }
    document.addEventListener('mousemove', update);
    return () => {
      document.removeEventListener('mousemove', update);
    }
  })
  return position;
}

export default usePosition;
