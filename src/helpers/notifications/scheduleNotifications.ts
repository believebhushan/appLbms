import notifee, {TimestampTrigger, TriggerType,RepeatFrequency} from '@notifee/react-native';

async function scheduleNotification() {
  const date = new Date(Date.now());
  date.setHours(date.getHours());
  date.setMinutes(date.getMinutes());
  date.setSeconds(date.getSeconds()+30);


  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
    repeatFrequency: RepeatFrequency.WEEKLY,
  };


  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await notifee.createTriggerNotification(
    {
      id: '123',
      title: 'Meeting with Jane',
      body: `${date}`,
      android: {
        channelId: channelId,
      },
    },
    trigger
  );
  console.log('scheduleNotification',date);
}

export default scheduleNotification;


