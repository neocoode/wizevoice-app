import { IMessages } from "../../interfaces/IChatListItem";

export const nameStore = 'chat';

export interface IChatState {
  messages: IMessages[] | undefined;
}

