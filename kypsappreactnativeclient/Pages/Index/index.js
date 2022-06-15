import { StyleSheet, View, TouchableHighlight, Text, ScrollView, TextInput } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useState } from "react"
import Middleware from "../../middleware"
import Serializer from "../../Components/serializer"

const stack = createNativeStackNavigator()

const SendFormData = (page, json_data, setErrors, navigation) => {
	Middleware.SendRequest(Serializer(json_data), "POST", page).then(json_data => {
		if (json_data["response"] === "ok"){
			navigation.navigate("home")			
		}else{
			setErrors({...json_data["response"]["errors"]})
		}
	})
}

const Login = (props) => {
	
	const [errors, setErrors] = useState([])
	const [username_input, setUI] = useState("")
	const [password_input, setPI] = useState("")
	
	return(
		<View style = {styles.container}>
            <Text style={styles.title}>Kyps</Text>
            <ScrollView style={styles.scroll} contentContainerStyle={{alignItems:"center"}}>
                <View style={styles.inputcont}>
					<Text style={styles.normaltext}>Username</Text>
					<TextInput style={styles.inputtext} onChangeText={(value) => {setUI(value)}} />
				</View>
                <View style={styles.inputcont}>
					<Text style={styles.normaltext}>Password</Text>
					<TextInput secureTextEntry={true} style={styles.inputtext} onChangeText={(value) => {setPI(value)}} />
				</View>
				<View style={{padding:10, borderRadius:12, marginBottom:30, flex:1, alignItems:"flex-end", width:"90%"}}>
					<TouchableHighlight>
						<Text style={{color:"white"}} onPress={() => {props.navigation.navigate("registration")}}>Registration</Text>
					</TouchableHighlight>
				</View>
				<TouchableHighlight style={styles.submitbutton} onPress={() => {SendFormData("login", {"username":username_input, "password1":password_input}, setErrors, props.navigation)}}>
					<Text style={styles.normaltext}>
						Login
					</Text>
				</TouchableHighlight>
				<View style={styles.errorcont}>
					{
						Object.keys(errors).map(ele => {
							return <Text key={ele}>*{errors[ele][0]}</Text>
						})
					}
				</View>
            </ScrollView>
        </View>
	)

}
const Registration = (props) => {

	const [errors, setErrors] = useState([])
	var [username_input, setUI] = useState("")
	var [password_input, setPI] = useState("")
	var [password_input_2, setPI2] = useState("")

	return(
		<View style = {styles.container}>
			<Text style={styles.title}>Kyps</Text>
            <ScrollView style={styles.scroll} contentContainerStyle={{alignItems:"center"}}>
                <View style={styles.inputcont}>
					<Text style={styles.normaltext}>Username</Text>
					<TextInput style={styles.inputtext} onChangeText={(value) => {setUI(value)}} />
				</View>
                <View style={styles.inputcont}>
					<Text style={styles.normaltext}>Password</Text>
					<TextInput secureTextEntry={true} style={styles.inputtext} onChangeText={(value) => {setPI(value)}} />
				</View>
                <View style={styles.inputcont} >
					<Text style={styles.normaltext}>Riscrivi la password</Text>
					<TextInput secureTextEntry={true} style={styles.inputtext} onChangeText={(value) => {setPI2(value)}} />
				</View>
				<View style={{padding:10, borderRadius:12, marginBottom:30, flex:1, alignItems:"flex-end", width:"90%"}}>
					<TouchableHighlight>
						<Text style={{color:"white"}} onPress={() => {props.navigation.navigate("login")}}>Login</Text>
					</TouchableHighlight>
				</View>
				<TouchableHighlight style={styles.submitbutton} onPress={() => {SendFormData("registration", {"username":username_input, "password1":password_input, "password2":password_input_2}, setErrors, props.navigation)}}>
					<Text style={styles.normaltext}>
						Registration
					</Text>
				</TouchableHighlight>
				<View style={styles.errorcont}>
					{
						Object.keys(errors).map(ele => {
							return <Text key={ele}>*{errors[ele][0]}</Text>
						})
					}
				</View>
            </ScrollView>
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
		marginBottom:30,
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
		alignItems:"center",
		marginBottom:60
	},
	errortext:{
		color:"#554343",
		fontSize:14
	}
  });
  

export default Index