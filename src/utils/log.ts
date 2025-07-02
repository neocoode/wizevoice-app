import { logger } from 'react-native-logs';

const COLORS: Record<string, string> = {
      info: '\x1b[34m',   // azul
      warn: '\x1b[33m',   // amarelo
      error: '\x1b[31m',  // vermelho
      debug: '\x1b[90m',  // cinza
      log: '\x1b[37m',    // branco
      reset: '\x1b[0m',
};

// Transport personalizado com cores ANSI
const customTransport = (props: any) => {
      try {
            if (!props || !props.level || !props.msg) {
                  // fallback simples
                  const msg = Array.isArray(props?.msg) ? props.msg.join(' ') : String(props?.msg ?? '');
                  console.log('[LOG]', msg);
                  return;
            }
            const levelText = typeof props.level === 'string' ? props.level : (props.level.text || 'log');
            const color = COLORS[levelText] || COLORS.log;
            const reset = COLORS.reset;
            const msg = Array.isArray(props.msg) ? props.msg.join(' ') : String(props.msg);
            console.log(`${color}[${levelText.toUpperCase()}]${reset} ${msg}${reset}`);
      } catch (err) {
            // fallback para qualquer erro inesperado
            const msg = Array.isArray(props?.msg) ? props.msg.join(' ') : String(props?.msg ?? '');
            console.log('[LOG ERROR]', err, msg);
      }
};

// Criação do logger global
const log = logger.createLogger({
      severity:  'debug', // nível baseado no ambiente
      transport: customTransport,
      async: false, // logs síncronos
});

export default log;
