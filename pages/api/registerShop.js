import Axios from 'axios';

const res = async (req, res) => {
    let data = JSON.parse(JSON.stringify(req.body));

    console.log(data);

    let HEADERS = { 
        headers: {
            "Content-Type": "application/json", 
            "x-auth-token":  data.tokenId
        }
    }

    delete data.tokenId

    console.log(data);

    Axios.post(`${process.env.serverUrl}/shops/register`, data , HEADERS)
        .then(r => 
            res.status(200).send(r.data)
        )
        .catch((err) => {
            console.log(err);
        })
}

export default res;

