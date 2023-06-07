import Api from "../util"

const BASE_URL = process.env.BASE_URL

async function updateListRequisite(payload) {
    const endpoint = `${payload.head || BASE_URL}/update_course_condition`
    console.log({endpoint})
    console.log({payload})
    return Api.post(endpoint, payload.tail)
}

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            let raw = await updateListRequisite(JSON.parse(req.body))
            return res.json(raw)

        default:
            res.setHeader("Allow", ["GET", "POST"])
            return res.status(405).json({ success: false }).end(`Method ${method} Not Allowed`)
    }
}
