import React from 'react';



import CustomBottomSheet from '../../components/customBottomSheet';
import { MapView } from '../../components/mapView';
import SearchMapScreen from '../searchMapScreeen';

import * as St from './styles';

const MapScreen = () => {
  const sheetRef = React.useRef(null);

  return (
    <St.Container>
      <St.MapView>
        <MapView />
      </St.MapView>
      <CustomBottomSheet pages={[
        <SearchMapScreen />
      ]} pageSelected={0} />
    </St.Container>
  );
};

export default MapScreen;
