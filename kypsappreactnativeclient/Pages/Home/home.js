import { StyleSheet, View, TouchableHighlight, Text, Image, TextInput, ScrollView } from "react-native"

const Card = () => {
  return(
    <View style={styles.card}>
      <View style={styles.cardnavbuttonscont}>
        <TouchableHighlight style={styles.cardnavbuttons}>
          <Image source={require("../../Media/adjust.png")} style={styles.searchimg} />
        </TouchableHighlight>
        <TouchableHighlight style={styles.cardnavbuttons}>
          <Image source={require("../../Media/delete.png")} style={styles.searchimg} />
        </TouchableHighlight>
      </View>
      <View style={styles.cardformcont}>
        <View style={styles.inputocont}>
          <Text style={styles.cardtextform}>Servizio</Text>
          <TextInput style={styles.cardtextinput} />
        </View>
        <View style={styles.inputocont}>
          <Text style={styles.cardtextform}>Username</Text>
          <TextInput style={styles.cardtextinput} />
        </View>
        <View style={styles.inputocont}>
          <Text style={styles.cardtextform}>Password</Text>
          <TextInput style={styles.cardtextinput} />
        </View>
      </View>
      <View style={styles.cardfooterbuttonscont}>
        <TouchableHighlight style={styles.cardfooterbuttons}><Text>Salva</Text></TouchableHighlight>
        <TouchableHighlight style={styles.cardfooterbuttons}><Text>Annulla</Text></TouchableHighlight>
      </View>
    </View>
  )
}

const Home = () => {
    return (
        <View style = {styles.container}>
            <View style={styles.searchcont}>
              <Image source={require("../../Media/search.png")} style={styles.searchimg} />
              <TextInput style={styles.textinput} />
            </View>
            <ScrollView style={styles.cardcont} contentContainerStyle={{justifyContent:"flex-start", alignItems:"center"}}>
              <Card/>
              <Card/>
              <Card/>
              <Card/>
              <Card/>
            </ScrollView>
            <View style={styles.optionsnav}>
              <TouchableHighlight>
                <Image source={require("../../Media/add.png")} style={styles.navbuttonimg} />
              </TouchableHighlight>
              <TouchableHighlight>
                <Image source={require("../../Media/left.png")} style={styles.navbuttonimg} />
              </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      display:"flex",
      backgroundColor: '#82b3c2',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height:"100%",
      position:"relative",
      overflow:"scroll"
    },
    optionsnav:{
      display:"flex",
      justifyContent:"space-around",
      flexDirection:"row",
      alignItems:"center",
      width:"90%",
      height:70,
      backgroundColor:"rgba(255, 255, 255, 0.53)",
      borderRadius:15,
      marginBottom:10,
      marginTop:10
    },
    navbuttonimg:{
      height:50,
      width:50
    },
    searchimg:{
      width:25,
      height:25
    },
    searchcont:{
      width:"90%",
      height:50,
      padding:20,
      backgroundColor:"white",
      borderRadius:15,
      display:"flex",
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-around",
      marginTop:50,
      marginBottom:10
    },
    textinput:{
      width:"80%",
      height:50
    },
    cardcont:{
      width:"100%",
      flex:1,
      height:"100%",
      padding:10
    },
    card:{
      width:300,
      height:400,
      backgroundColor:"rgba(255, 255, 255, 0.53)",
      display:"flex",
      justifyContent:"flex-start",
      borderRadius:15,
      marginBottom:20
    },
    cardnavbuttonscont:{
      display:"flex",
      backgroundColor:"white",
      flexDirection:"row",
      borderTopLeftRadius:15,
      borderTopRightRadius:15,
    },
    cardfooterbuttonscont:{
      display:"flex",
      backgroundColor:"white",
      flexDirection:"row",
      borderBottomLeftRadius:15,
      borderBottomRightRadius:15,
      width:"100%"
    },
    cardfooterbuttons:{
      width:"100%",
      flex:1,
      padding:10,
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center",
    },
    cardnavbuttons:{
      width:"100%",
      flex:1,
      padding:10,
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center",
    },
    cardtextinput:{
      width:"100%",
      height:40,
      backgroundColor:"white",
      borderRadius:10,
      padding:10
    },
    cardtextform:{
      color:"white",
      fontSize:15,
      marginBottom:10
    },
    cardformcont:{
      flex:1,
      justifyContent:"space-around",
      width:"100%",
      height:"30%",
      alignItems:"center"
    },
    inputocont:{
      width:"80%",
      display:"flex",
      justifyContent:"flex-start",
      alignItems:"flex-start"
    }
  });
  

export default Home