import Axios from 'axios';

const res = async (req, res) => {
    let data = JSON.parse(JSON.stringify(req.body));
    console.log(data.shopId);

    let HEADERS = { headers: { "Content-Type": "application/json" } }

    Axios.get(`http://localhost:4000/shops/${data.shopId}`, HEADERS)
        .then(r => 
            res.status(200).send(r.data)
        )
        .catch((err) => {
            console.log(err);
        })
}

export default res;