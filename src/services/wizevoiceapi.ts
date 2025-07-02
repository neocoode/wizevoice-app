import ReqX from './reqx';
import log from '../utils/log';

export const getToken = async () => {
  try {
    log.info('getToken', 'getToken');
    log.info('process.env.API_URL!', process.env.API_URL!);
    log.info('process.env.CLIENT_KEY!', process.env.CLIENT_KEY!);
    const reqX = new ReqX(process.env.API_URL!, process.env.CLIENT_KEY!);
    const response = await reqX.post('/auth/token ', {});
    log.info('response', response);
    return response;
  } catch (error: any) {
    log.error('getToken error', error.message);
    throw error;
  }
};

export const sendMessage = async (data: any) => {
  const responseToken = await getToken();
  log.info('responseToken', responseToken);
  const reqX = new ReqX(process.env.API_URL!, responseToken.token);
  const response = await reqX.post('/api/message/', data);
  return response;
};
