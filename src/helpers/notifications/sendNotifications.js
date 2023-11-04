import notifee,{AndroidCategory,Importance} from '@notifee/react-native';

function generateRandomId(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
}

async function displayNotification({title, body, id = null}) {
  await notifee.requestPermission();

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  const generatedId = generateRandomId(8);
  await notifee.displayNotification({
    id: id ? id : generatedId,
    title: title,
    body: body,
    android: {
      channelId,
      smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
      pressAction: {
        id: 'default',
      },
    },
  });
  return id ? id : generatedId;
}

export default displayNotification;
