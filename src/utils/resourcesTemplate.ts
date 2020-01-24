export const resourcesTemplate = (str: string, vars: {[key in string]: string}) => {
  return str.replace(/%.+?%/g, match => {
    const key = match.replace(/\W/g, '');
    return vars[key];
  });
};
