import { all } from 'redux-saga/effects';
import driverSaga from '../store/driver/sagas';

// Root saga que combina todos os sagas da aplicação
export default function* rootSaga() {
  try {
    yield all([
      driverSaga(),
      // Adicione aqui outros sagas conforme necessário
    ]);
  } catch (error) {
    console.error('Erro no rootSaga:', error);
  }
} 