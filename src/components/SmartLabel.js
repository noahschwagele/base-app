import * as React from 'react';
import { View } from 'react-native';
import { Button, Text, Icon, Card , useTheme, ActivityIndicator} from 'react-native-paper';

const SmartLabel = ({title, value}) => {
    const theme = useTheme();
    return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 5 }}>
               <Text width={'30%'}>{title}</Text>
               <Text
                 width={'70%'}
                 style={{ backgroundColor: theme.colors.background, padding: 10, fontWeight: '600', borderRadius: 5 }}
               >{value}</Text>
       </View>
    )
}

export default SmartLabel;