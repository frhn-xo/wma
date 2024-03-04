const getDateTime = () => {
  const currentDate = new Date();
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formattedDate = dateFormatter.format(currentDate);

  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  });
  const formattedTime = timeFormatter.format(currentDate);

  return { formattedDate, formattedTime };
};

const separateIntegerAndDecimal = (input) => {
  const [intPart, decPart] = input.split('.');
  const intStr = intPart;
  const decStr = intPart === '100' ? '%' : `.${decPart}%`;

  return { intStr, decStr };
};

export { getDateTime, separateIntegerAndDecimal };
