import { StyleSheet, View, TouchableHighlight, Text, ScrollView, TextInput } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useRef, useState } from "react"
import Middleware from "../../middleware"

const stack = createNativeStackNavigator()

const SendFormData = (page, form, setErrors) => {
	let form_data = new FormData(document.querySelector(form))
	Middleware.SendRequest(form_data, "POST", page).then(json_data => {
		if (json_data["response"] === "ok"){
	
			
		}else{
			setErrors({...json_data["response"]["errors"]})
		}
	})
}

const Login = (props) => {
	
	const [errors, setErrors] = useState([])
	
	return(
		<View style = {styles.container}>
            <Text style={styles.title}>Kyps</Text>
            <ScrollView style={styles.scroll} contentContainerStyle={{alignItems:"center"}}>
                <View style={styles.inputcont}>
					<Text style={styles.normaltext}>Username</Text>
					<TextInput style={styles.inputtext} />
				</View>
                <View style={styles.inputcont}>
					<Text style={styles.normaltext}>Password</Text>
					<TextInput secureTextEntry={true} style={styles.inputtext} />
				</View>
				<TouchableHighlight style={styles.submitbutton} onPress={() => {SendFormData("login", "", setErrors)}}>
					<Text style={styles.normaltext}>
						Login
					</Text>
				</TouchableHighlight>
				<View style={styles.errorcont}>
					{
						Object.keys(errors).map(ele => {
							return <p key={ele}>*{errors[ele][0]}</p>
						})
					}
				</View>
            </ScrollView>
			<TouchableHighlight onPress={() => {props.navigation.navigate("registration")}} style={{backgroundColor:"#3f8969b1", padding:10, borderRadius:12, marginBottom:20}}>
				<Text style={{color:"white"}}>
					Registration
				</Text>
			</TouchableHighlight>
        </View>
	)

}
const Registration = () => {
	return(
		<View>

		</View>
	)
}

const Index = () => {
    return (
        <stack.Navigator screenOptions={{headerShown:false}}>
			<stack.Screen component={Login} name="login"/>
			<stack.Screen component={Registration} name="registration"/>
		</stack.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
      display:"flex",
      backgroundColor: '#82b3c2',
      alignItems: 'center',
      justifyContent: 'center',
      height:"100%"
    },
    title:{
        color:"white",
        fontSize:40,
        paddingTop:50,
		paddingBottom:30
    },
    scroll:{
        width:"100%",
        height:"100%",
    },
	inputtext:{
		width:"100%",
		padding:8,
		borderRadius:15,
		backgroundColor:"white"
	},
	normaltext:{
		color:"white",
		fontSize:18,
	},
	inputcont:{
		width:"90%",
		display:"flex",
		justifyContent:"space-around",
		alignItems:"flex-start",
		height:90,
		marginBottom:60,
	},
	submitbutton:{
		width:"80%",
		padding:10,
		borderRadius:15,
		backgroundColor:"#20714eb1",
		flex:1,
		alignItems:"center",
		marginBottom:60,
	},
	errorcont:{
		width:"100%",
		flex:1,
		justifyContent:"flex-start",
		alignItems:"center"
	},
	errortext:{
		color:"#554343",
		fontSize:14
	}
  });
  

export default Index