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

function formatTimeDifference(timestamp) {
  const timestampDate = new Date(parseInt(timestamp));
  const now = new Date();

  const secondsDifference = Math.floor((now - timestampDate) / 1000);

  if (secondsDifference < 60) {
    return "just now";
  } else if (secondsDifference < 3600) {
    const minutes = Math.floor(secondsDifference / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (now.getDate() === timestampDate.getDate()) {
    return timestampDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else {
    return timestampDate.toLocaleString();
  }
}
export {getLogs, groupAndReturn,formatTimeDifference};
