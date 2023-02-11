import React from 'react';
import { Chip as StyledChip } from './Styles';

type TChipProps = {
	children?: React.ReactNode;
};

const Chip = ({ children }: TChipProps) => {
	return <StyledChip>{children}</StyledChip>;
};

export default Chip;
