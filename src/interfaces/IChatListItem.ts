// Interface para item do ChatList
// Representa uma mensagem do chat, com id, texto e autor

import { ESender } from './IAutor';

export enum ELanguage {
  PT_BR = 'pt-BR',
  EN_US = 'en-US',
}

export interface IMessages {
  id: string;
  texto: string;
  sender: ESender;
  language: ELanguage;
} 