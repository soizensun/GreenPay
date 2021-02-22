import Axios from 'axios';

const res = async (req, res) => {
    let data = JSON.parse(JSON.stringify(req.body));

    let HEADERS = {
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": data.tokenId
        }
    }

    delete data.tokenId

    Axios.get(`${process.env.serverUrl}/users/getShop`, HEADERS)
        .then(r =>{
            res.status(200).send(r.data)}
        )
        .catch((err) => {
            console.log(err);
        })
}

export default res;

