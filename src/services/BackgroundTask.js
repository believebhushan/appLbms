import BackgroundService from 'react-native-background-actions';
import Contacts from 'react-native-contacts';
import displayNotification from '../helpers/notifications/sendNotifications';


const loadContacts = async () => {
        const all = await Contacts.getAll();
    // const notfifictionId = await displayNotification({title: "Contact Loaded  ", body: `${JSON.stringify(all[2])}`});
    // console.log(notfifictionId,"notfifictionId ");
};


const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

const veryIntensiveTask = async (taskDataArguments) => {
  setTimeout(async ()=>{
    await loadContacts();
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(json => {
        console.log(json,"data fetched");
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
    });
  },10000)

    const { delay } = taskDataArguments;
    await new Promise( async (resolve) => {
        for (let i = 0; BackgroundService.isRunning(); i++) {
            // console.log(i);
            await sleep(delay);
        }
    });
};

const options = {
    taskName: 'Example',
    taskTitle: 'ExampleTask title ',
    taskDesc: 'ExampleTask description',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
        delay: 10000,
    },
    delay: 20000,
};
const initProcess = async ()=>{
    // console.log("starting...");
    await BackgroundService.start(veryIntensiveTask, options);
    await BackgroundService.updateNotification({taskDesc: 'New ExampleTask description '}); // Only Android, iOS will ignore this call

    // console.log("stoping the service...")
    await BackgroundService.stop();
}

export default initProcess;
