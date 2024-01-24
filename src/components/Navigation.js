import { useNavigation } from '@react-navigation/native';

export function navigateToScreen(navigation, screen) {
    navigation.navigate(screen);
}