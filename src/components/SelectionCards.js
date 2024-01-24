import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Text, Card, Divider, List, useTheme} from 'react-native-paper';
import { View } from 'react-native';

const MoreInfoList = () => {
    const theme = useTheme();
    const [expanded, setExpanded] = React.useState(true);
  
    const handlePress = () => setExpanded(!expanded);
  
    return (
        <List.Accordion
          title="more Info"
          style={{backgroundColor: '#fff', padding:15, margin: -15, }}
          >
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
    );
  };
  

const SelectionCard = (props) => {
    const  {HEATNUMBER, STEEL_GRADE_NAME} = props.props
    const navigation = useNavigation();

    const NavigatetoTruckInfo = () => {
        navigation.navigate('AssignScreen', {
            heatNumber: HEATNUMBER,
        })
    }
    return (
        <Card style={{padding: 5, margin: 5, backgroundColor: '#fff'}}>
            <Card.Content>
                <Text variant='titleMedium'>HEAT INCOMING</Text>
                <Text variant='labelMedium'>Heat NO: {HEATNUMBER}</Text>
                <Text variant='bodySmall'>Steel Grade: {STEEL_GRADE_NAME}</Text>
                {/* <MoreInfoList/> */}
            </Card.Content >
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Button onPress={()=> NavigatetoTruckInfo(props)} style={{borderRadius: 5, backgroundColor: 'green'}} mode='contained'>Accept</Button>
                </View>
            </Card>
            
        
    )
}

export default SelectionCard