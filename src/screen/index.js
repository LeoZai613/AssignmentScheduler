import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import SignupScreen from './SignupScreen';
import LoginScreen from './LoginScreen';
import LifecyclePracScreen from './LifecyclePracScreen';
import UserProfileScreen from './UserProfileScreen';
import PropDrillingScreen from './PropDrillingScreen';
import UseRefTestScreen from './UseRefTestScreen';
import FetchScreen from './FetchScreen';
import DashboardScreen from './DashboardScreen';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://7e05f9f6db676f57c7aa4851234ac018@o4506733350092800.ingest.sentry.io/4506733351731200',
});

export {
  HomeScreen,
  DetailsScreen,
  SignupScreen,
  LoginScreen,
  LifecyclePracScreen,
  UserProfileScreen,
  PropDrillingScreen,
  UseRefTestScreen,
  FetchScreen,
  DashboardScreen,
};
