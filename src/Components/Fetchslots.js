import axios from 'axios'

const fetchSlots = async (dates, clinic_in, service_in) => {
    const clinId = clinic_in.id;
    const servId = service_in.id;
    var info = {}
    await Promise.all(
        dates.map(async (id) => {
            const result = await axios.get(`https://19be91bf2h.execute-api.eu-west-1.amazonaws.com/akpovesoa/clinics/${clinId}/services/${servId}/timeslots/${id}`, {
                headers: {
                    'x-api-key': 'G3SmBiCujc79kJYnqFUCaqGGd0aI68K9A8CXX4N1'
                }
            })
            if (Object.entries(result.data).length !== 0) {
                info[id] = result.data
            }
        })
    )
    return info
}

export default fetchSlots