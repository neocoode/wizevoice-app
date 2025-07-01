// Enum for chat status in English
export enum EStatus {
  Idle = 'Idle', // aguardando ação
  Listening = 'Listening...', // gravando voz
  Processing = 'Processing...', // após onSpeechEnd
  Stopping = 'Stopping recording...', // enquanto o stopListening é chamado
}
