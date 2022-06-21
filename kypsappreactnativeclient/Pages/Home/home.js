import { StyleSheet, View, TouchableHighlight, Text, Image, TextInput, ScrollView } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import Middleware from "../../middleware";
import { v4 } from 'uuid';
import { useState, useEffect } from "react"

const Card = (props) => {

	const dispatch = useDispatch()
	const cred = useSelector(state => state.credReducer)
	const user_auth_id = useSelector(state => state.userauthidReducer)

	const [widact, setWidAct] = useState(false)
	
	const [ser, setSer] = useState("")
	const [use, setUse] = useState("")
	const [pass, setPass] = useState("")

	const [newmode, setNewMode] = useState(props.infos.newmode)
	const [id_cred, setIdCred] = useState(props.infos.id_cred)

	useEffect(() => {
		if (newmode == true){
			setWidAct(!widact)
		}else{
			SetInputValues()
		}
	}, [])

	const SetInputValues = () => {
        setSer(props.infos.service)
        setUse(props.infos.username)
        setPass(props.infos.password)
    }

	const UndoEvent = () => {
        if (newmode == true){
            props.PopCred()
        }else{
            setWidAct(!widact)
        }
    }

	const SaveEvent = () => {
        if (newmode == true){
            SaveNewCred()
        }else{
            UpdateCard()
        }
    }

	const GetFormData = () => {
		let form_data = new FormData()
		form_data.append("service", ser)
		form_data.append("username", use)
		form_data.append("password", pass)
        form_data.append("user_auth_id", user_auth_id)
		return form_data
	}

	const SaveNewCred = () => {
        let form_data = GetFormData()
        Middleware.SendRequest(form_data, "POST", "post_credentials").then(json_data => {
            if (json_data.response === "ok"){
                setIdCred(json_data.id_cred)
                setWidAct(!widact)
                setNewMode(false)
                props.Save()
                updateCred(cred.length - 1, json_data.id_cred)
            }
        })
    }

	const UpdateCard = () => {
        let form_data = JSON.stringify({service:ser, username:use, password:pass})
        Middleware.SendRequest(null, "PUT", "put_credentials/" + id_cred + "/" + user_auth_id + "/" + form_data).then(json_data => {
            if (json_data.response === "ok"){
                setWidAct(!widact)
                updateCred(props.index_card)
            }
        })
    }

	const updateCred = (index, id_c) => {
        dispatch({type:"updateCred", service:ser, username:use, password:pass, index:index, id_cred:id_c})
    }

	const AdjustEvent = () => {
        if (newmode == false){
            setWidAct(!widact)
        }
    }

	const DeleteCard = () => {
        if (newmode == false){
            Middleware.SendRequest(null, "DELETE", "delete_credentials/" + id_cred + "/" + user_auth_id).then(json_data => {
                if (json_data.response === "ok"){
                   //
                }
            })
            dispatch({type:"spliceCred", index:props.index_card})
        }
    }

	return(
		<View style={styles.card}>
			<View style={styles.cardnavbuttonscont}>
				<TouchableHighlight underlayColor={"#D8EAEF"} style={[styles.cardnavbuttons, {borderTopLeftRadius:15}]} onPress={AdjustEvent}>
					<Image source={require("../../Media/adjust.png")} style={styles.searchimg} />
				</TouchableHighlight>
				<TouchableHighlight underlayColor={"#D8EAEF"} style={[styles.cardnavbuttons, {borderTopRightRadius:15}]} onPress={DeleteCard}>
					<Image source={require("../../Media/delete.png")} style={styles.searchimg} />
				</TouchableHighlight>
			</View>
			<View style={styles.cardformcont}>
				<View style={styles.inputocont}>
					<Text style={styles.cardtextform}>Servizio</Text>
					<TextInput style={styles.cardtextinput} value={ser} editable={widact} onChangeText={(value) => {setSer(value)}}/>
				</View>
				<View style={styles.inputocont}>
					<Text style={styles.cardtextform}>Username</Text>
					<TextInput style={styles.cardtextinput} value={use} editable={widact} onChangeText={(value) => {setUse(value)}}/>
				</View>
				<View style={styles.inputocont}>
					<Text style={styles.cardtextform}>Password</Text>
					<TextInput secureTextEntry={true} style={styles.cardtextinput} value={pass} editable={widact} onChangeText={(value) => {setPass(value)}}/>
				</View>
			</View>
			<View style={styles.cardfooterbuttonscont}>
				<TouchableHighlight underlayColor={"#D8EAEF"} style={[styles.cardfooterbuttons, {borderBottomLeftRadius:15}]} disabled={!widact} onPress={SaveEvent}><Text>Salva</Text></TouchableHighlight>
				<TouchableHighlight underlayColor={"#D8EAEF"} style={[styles.cardfooterbuttons, {borderBottomRightRadius:15}]} disabled={!widact} onPress={UndoEvent}><Text>Annulla</Text></TouchableHighlight>
			</View>
		</View>
	)
}

const Home = (props) => {
	
	const [saving, setSaving] = useState(false)
	const cred = useSelector(state => state.credReducer)
	const [searchkey, setSearchKey] = useState("")
	const dispatch = useDispatch()
	const user_auth_id = useSelector(state => state.userauthidReducer)

	useEffect(() => {
		GetCreds()
	}, [])

	const AddNewCred = () => {
		if (saving == false){
			dispatch({type:"setCred", value:{newmode:true, id_comp:v4(), username:"", service:"", password:"", id_cred:null}})
			setSaving(true)
		}   
	}

	const PopCred = (index) => {
		index === undefined ? dispatch({type:"popCred"}) : dispatch({type:"spliceCred", index:index})
		setSaving(false)
	}

	const Save = () => {
		setSaving(false)
	}

	const GetCreds = () => {
		Middleware.SendRequest(null, "GET", "get_credentials/" + user_auth_id).then(json_data => {
			json_data.response.forEach(ele => {
				ele["newmode"] = false
				ele["id_comp"] = v4()
			})
			dispatch({type:"resetCred", value:json_data.response})
		})
	}

	const ExitEvent = () => {
		dispatch({type:"setUserAuthID", value:null})
		props.navigation.navigate("index")
	}

	return (
		<View style = {styles.container}>
			<View style={styles.searchcont}>
				<Image source={require("../../Media/search.png")} style={styles.searchimg} />
				<TextInput style={styles.textinput} onChangeText={(value) => setSearchKey(value)} />
			</View>
			<ScrollView style={styles.cardcont} contentContainerStyle={{justifyContent:"flex-start", alignItems:"center"}}>
			{
				cred.map((ele, index) => {
					if ((ele.username.includes(searchkey) || ele.service.includes(searchkey)) || ele.password.includes(searchkey)){
						return <Card key={ele.id_comp} index_card = {index} infos = {ele} Save = {Save} PopCred = {PopCred} />
					}
				})
			}
			</ScrollView>
			<View style={styles.optionsnav}>
				<TouchableHighlight onPress={ExitEvent}>
					<Image source={require("../../Media/left.png")} style={styles.navbuttonimg} />
				</TouchableHighlight>
				<TouchableHighlight onPress={AddNewCred}>
					<Image source={require("../../Media/add.png")} style={styles.navbuttonimg} />
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