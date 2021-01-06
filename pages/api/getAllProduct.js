import Axios from 'axios';

const res = async (req, res) => {
    let HEADERS = { headers: { "Content-Type": "application/json" } }

    Axios.get('https://cs-service.herokuapp.com/products/', HEADERS)
        .then(r => res.status(200).send(r.data))
        .catch((err) => {
            console.log(err);
        })
}

export default res;