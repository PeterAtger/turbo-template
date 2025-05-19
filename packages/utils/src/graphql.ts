export const stringifyVariables = (variables: object) => JSON.stringify(variables).replace(/"([^"]+)":/g, '$1:');
