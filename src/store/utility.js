export const updateObject = (oldObject, upddateProperties) => {
  return {
    ...oldObject,
    ...upddateProperties,
  };
};
