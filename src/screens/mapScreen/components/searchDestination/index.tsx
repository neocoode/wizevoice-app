import React from 'react';

import CustomBottomSheet from '../../../../components/customBottomSheet';
import SearchMapScreen from '../../../searchMapScreeen';

const SearchDestination: React.FC = () => {
    return (
        <CustomBottomSheet pages={[
            <SearchMapScreen />
        ]} pageSelected={0} />
    );
};

export default SearchDestination;
