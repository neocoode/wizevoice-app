import { takeLatest, put } from 'redux-saga/effects';
import { setCurrentDriver, setCurrentDriverSuccess, setCurrentDriverError } from './slice';

// Função para buscar dados do motorista
function* fetchDriverData() {
  try {
    // Aqui você pode fazer a chamada para sua API
    // const response = yield call(api.getDriverData);

    // Exemplo de sucesso
    yield put(setCurrentDriver({
      id: '1',
      name: 'João Silva',
      vehicle: {
        model: 'Toyota Corolla',
        plate: 'ABC1234'
      },
      location: {
        latitude: -23.550520,
        longitude: -46.633308
      },
      status: 'available'
    }));
    yield put(setCurrentDriverSuccess(true));
  } catch (error) {
    yield put(setCurrentDriverError(error instanceof Error ? error.message : 'Erro ao buscar dados do motorista'));
  }
}

export default function* driverSaga() {
  yield takeLatest('driver/setCurrentDriver', fetchDriverData);
}
