import Axios from 'axios';

const res = async (req, res) => {
    let data = JSON.parse(JSON.stringify(req.body));

    let HEADERS = { 
        headers: {
            "Content-Type": "application/json", 
            "x-auth-token":  data.tokenId
        }
    }
    console.log(data);

    delete data.tokenId

    Axios.post(`http://localhost:4000/carts/confirmCart`, data , HEADERS)
        .then(r => 
            res.status(200).send(r.data)
        )
        .catch((err) => {
            console.log(err);
        })
}

export default res;

