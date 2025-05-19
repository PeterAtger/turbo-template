import vm from 'node:vm';

/**
 * This is not a security mechanism, however it hides away the global context
*/
export function safeEval(expression: string, variables: Record<string, number | string>) {
  const context = vm.createContext(variables);

  return vm.runInContext(expression, context);
}
