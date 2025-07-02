import { createAsyncThunk } from '@reduxjs/toolkit';

import { ELanguage, ESender, IMessages } from '../../interfaces';
import { chatAddMessage } from './store.chat.slice';
import { generateObjectId } from '../../utils';
import log from '../../utils/log';

export const addUserMessageThunk = createAsyncThunk(
  'chat/addUserMessage',
  async (userMessage: IMessages, { dispatch }) => {
    log.info('addUserMessageThunk', 'addUserMessageThunk');
    // 1. Adiciona mensagem do usuário imediatamente
    dispatch(chatAddMessage(userMessage));

    // 2. Aqui vai a simulação (ou chamada real de API para o agente responder)
    await new Promise(resolve => setTimeout(resolve, 500)); // simula latência
    
    // 3. Gera resposta do agente
    const agentResponse: IMessages = {
      id: generateObjectId(),
      texto: 'Ok! Vamos começar a aprender inglês juntos. 😊',
      sender: ESender.Agent,
      language: ELanguage.PT_BR,
    };

    // 4. Adiciona a resposta do agente
    dispatch(chatAddMessage(agentResponse));

    return true;
  }
);
