/*eslint-disable*/
export const formDataCreate = (list: Array<{ name: string; value: any }>) => {
  const formData = new FormData();

  list.map(({ name, value }) => {
    if (value) {
      formData.append(name, value);
    }
  });

  return formData;
};
