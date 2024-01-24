import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const RefreshNav = ({refresher}) => {
  const [timer, setTimer] = useState(15);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Update the timer every second
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 120));
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [timer]);

  const functionToRestart = () => {
    // Add your functionality here
    console.log("Function executed!");
    refresher()
    
    // After executing the function, restart the timer
    setTimer(15);
  };

  // Call your function when the timer reaches zero
  useEffect(() => {
    if (timer === 0) {
      functionToRestart();
    }
  }, [timer]);

  return (
    <View style={{ backgroundColor: '#ddd', padding: 10 }}>
      <Text>Refresh in {timer} seconds</Text>
    </View>
  );
};

export default RefreshNav;
