





    export const getUserInfo = async(token)=>{
        let API = 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=';
        
        let data = {}
        let url = `${API}${token}`;

        console.log("url====================: "+url)

       return fetch(url)
            .then((response) => response.json())
            .then((json) => {

     

                data.name = json.name;
                data.img = json.picture;
                data.mail = json.email;
                data.id = json.id;
               
        
                return data;

            })
            .catch(error => console.error('Error:', error))
            
    }

    
