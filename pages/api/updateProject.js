import Axios from 'axios';

const res = async (req, res) => {
    let data = JSON.parse(JSON.stringify(req.body));

    let HEADERS = {headers: {"Content-Type": "application/json",}}

    Axios.post(`${process.env.serverUrl}/projects/updateProject`, data, HEADERS)
        .then(r =>
            res.status(200).send(r.data)
        )
        .catch((err) => {
            console.log(err);
        })
}

export default res;