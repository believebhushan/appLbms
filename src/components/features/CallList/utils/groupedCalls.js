const groupedcalls = ({ data, groupOn = 'phoneNumber' }) => {
    const groupedResult = {};
  
    // Iterate through the data array
    (data || []).forEach(call => {
      // Use the specified property (default is 'PhoneNumber') for grouping
      const key = call[groupOn];
  
      // Check if the group already exists, if not, create it
      if (!groupedResult[key]) {
        groupedResult[key] = {
          phoneNumber: key,
          totalDuration: 0,
          name: call.name,
          lastCall: null,
        };
      }
  
      // Check if the current call is the latest call in the group
      if (!groupedResult[key].lastCall || call.timestamp > groupedResult[key].lastCall.timestamp) {
        groupedResult[key].lastCall = call;
      }
  
      // Calculate the total duration for the group
      groupedResult[key].totalDuration += call.duration;
    });
  
    // Convert the groupedResult object into an array of groups
    const resultArray = Object.values(groupedResult);
    resultArray.sort((a, b) =>parseInt( b.lastCall.timestamp) - parseInt(a.lastCall.timestamp));
  
    return resultArray;
  };
  
  export default groupedcalls;
  