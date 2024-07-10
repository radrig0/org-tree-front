import { FC } from 'react';

interface IProps {
  width: number;
  height: number;
}

export const PlusIcon: FC<IProps> = ({ width, height }) => {
  return (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
         stroke="currentColor"
         className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>

  );
};