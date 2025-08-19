interface RippelConstants {
  rippleColor: string;
  rippleRadius: number;
}

/**
 * Noop handler for factory function
 * @return a noop function
 */
export function noop(): Function {
  return () => {
  };
}


export const customRipple: RippelConstants = {rippleRadius: 10, rippleColor: 'orange'}
