import { StyleSheet, View, TouchableHighlight, Text } from "react-native"


const Home = () => {
    return (
        <View style = {styles.container}>
            <Text>Ciao mondo</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  

export default Home