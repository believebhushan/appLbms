import CallLogs from 'react-native-call-log';

const getLogs = async ({n, filter}) => {
  const data = await CallLogs.load(n || 20, {...filter});
  return data;
};

const cleanPhoneNumber = number => {
  const cleanedNum = number.replace(/\s/g, '');
  let dialableNum = '';
  if (cleanedNum.length >= 10) {
    dialableNum = cleanedNum.slice(cleanedNum?.length - 10, cleanedNum?.length);
  } else {
    dialableNum = cleanedNum;
  }

  return dialableNum;
};

const groupAndReturn = data => {
  const groupedData = data.reduce((result, currentItem) => {
    const phoneNumber = cleanPhoneNumber(currentItem.phoneNumber);

    if (!result[phoneNumber]) {
      result[phoneNumber] = [];
    }

    result[phoneNumber].push(currentItem);
    return result;
  }, {});

  const latestItems = Object.values(groupedData).map(group => {
    return group.reduce((latest, currentItem) => {
      const currentTimestamp = parseInt(currentItem.timestamp);
      const latestTimestamp = latest ? parseInt(latest.timestamp) : 0;

      return currentTimestamp > latestTimestamp ? currentItem : latest;
    }, null);
  });

  latestItems.sort((a, b) => {
   const timestampA = parseInt(a.timestamp);
   const timestampB = parseInt(b.timestamp);
   return timestampB - timestampA;
   });
  return latestItems;
};
export {getLogs, groupAndReturn};
