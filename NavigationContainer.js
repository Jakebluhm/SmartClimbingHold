 
import {
  NavigationContainer,
  useNavigationContainerRef
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'; 
import SecondScreenContainer from './Screens/SecondScreen'
import GymSettingsScreenContainer from './Screens/GymSettingsScreen'
import { 
    Text, 
    Button,
    View,
    TextInput, 
  } from 'react-native';

  const s = require('../Styles/StyleSheet');


  
const Drawer = createDrawerNavigator();
export default () => {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
 
        }

        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
      }}
    >
      <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={SecondScreenContainer} /> 
          <Drawer.Screen name="Gym Settings" component={GymSettingsScreenContainer} />  
      </Drawer.Navigator> 
    </NavigationContainer>
  );
};