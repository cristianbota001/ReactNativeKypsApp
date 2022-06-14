class Middleware{
    static SendRequest = async (data, method, page) => {
        let response = await fetch("http://192.168.1.66:8000/" + page, {method:method, body:data, credentials:"include"})
        return response.json()
    }
}

export default Middleware