import axios from 'axios'

export const SchedulerService = {
  getAvailableSalesTimeSlots: async function () {
    let _token = process.env.AUTH_TOKEN
    let _timeSlots = []
    let _time = []

    const config = { headers: { 'Authorization': `Bearer ${_token}` } }
    // _time = await axios.get(`https://api.bambee.club/available-sales-timeslots`, config)
    await axios.get(`https://api.bambee.club/available-sales-timeslots`, config)
      .then(response => {
        _time = response.data
        _time.forEach(element => {
          _timeSlots.push(new Date(element))
        })
        // console.log('Inside Service _timeSlot', _timeSlots)
      })
      .catch(e => {
        this.errors.push(e)
      })

    return _timeSlots
  }
}
