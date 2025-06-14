import React from 'react';



import { MapView } from '../../components/mapView';

import { SearchDestination } from './components';
import * as St from './styles';

const MapScreen = () => {
  const sheetRef = React.useRef(null);

  return (
    <St.Container>
      <St.MapView>
        <MapView />
      </St.MapView>
      <SearchDestination />      
    </St.Container>
  );
};

export default MapScreen;
