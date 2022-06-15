const Serializer = (json_data) => {
    let form_data = new FormData()
    for (const [key, value] of Object.entries(json_data)){
        form_data.append(key, value)
    }
    return form_data
}

export default Serializer