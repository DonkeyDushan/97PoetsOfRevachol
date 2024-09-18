import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const CheckIcon: React.FC<SvgIconProps> = (props: SvgIconProps) => (
  <SvgIcon {...props} width="24" height="24" viewBox="0 0 24 24">
    <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill={'#241b2f'}></path>
  </SvgIcon>
);
