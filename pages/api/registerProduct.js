import Axios from 'axios';

const res = async (req, res) => {
    let data = JSON.parse(JSON.stringify(req.body));

    let HEADERS = {headers: {"Content-Type": "application/json",}}

    console.log(data);

    Axios.post(`http://localhost:4000/products/register`, data, HEADERS)
        .then(r =>
            res.status(200).send(r.data)
        )
        .catch((err) => {
            console.log(err);
        })
}

export default res;