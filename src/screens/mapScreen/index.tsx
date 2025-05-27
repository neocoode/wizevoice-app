import React from 'react';



import * as St from './styles';
import CustomBottomSheet from '../../components/customBottomSheet';
import SearchMapScreen from '../searchMapScreeen';

const MapScreen = () => {
  const sheetRef = React.useRef(null);

  return (
    <St.Container>
      <St.MapView>
        {/* <MapView /> */}
      </St.MapView>
      <CustomBottomSheet pages={[
        <SearchMapScreen />
      ]} pageSelected={0} />
    </St.Container>
  );
};

export default MapScreen;
