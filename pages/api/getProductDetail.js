import Axios from 'axios';

const res = async (req, res) => {
    let data = JSON.parse(JSON.stringify(req.body));
    console.log(data.productId);

    let HEADERS = { headers: { "Content-Type": "application/json" } }

    Axios.get(`https://cs-service.herokuapp.com/products/${data.productId}`, HEADERS)
        .then(r => 

            res.status(200).send(r.data)
        )
        .catch((err) => {
            console.log(err);
        })
}

export default res;