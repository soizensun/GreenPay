import Axios from 'axios';

const res = async (req, res) => {
    let data = JSON.parse(JSON.stringify(req.body));

    let HEADERS = { headers: { "Content-Type": "application/json" } }

    Axios.delete(`${process.env.serverUrl}/projects/deleteProject/${data.projectId}`, HEADERS)
        .then(r => 

            res.status(200).send(r.data)
        )
        .catch((err) => {
            console.log(err);
        })
}

export default res;