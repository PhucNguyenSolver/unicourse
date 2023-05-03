import Api from "../util"

const BASE_URL = "https://register-course-check.onrender.com"

async function updateListRequisite(payload) {
    const endpoint = `${BASE_URL}/update_course_condition`
    return Api.post(endpoint, payload)
}

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            try {
                let raw = await updateListRequisite(JSON.parse(req.body))
                console.log(raw)
                if (raw.error) {
                  let { description, reason, code } = raw.error
                  throw description || reason || code
                } else {
                  return res.status(200).json(raw)
                }
            } catch (e) {
                return res.status(400).json(e.toString())
            }

        default:
            res.setHeader("Allow", ["GET", "POST"])
            return res.status(405).json({ success: false }).end(`Method ${method} Not Allowed`)
    }
}
