const inputCVU = document.getElementById('InputCVU')
const inputAmount = document.getElementById('InputAmount')
const textAreaDescription = document.getElementById('TextAreaDescription')
const btnSend = document.getElementById('btnSend')
var modalContent = document.getElementById('modalContent')

btnSend.addEventListener('click', async e => {
    console.log('clic')
    const CVU = inputCVU.value
    const amount = inputAmount.value
    const description = textAreaDescription.value
    if (amount > 0 && CVU) {
        e.preventDefault()
        try {
            const response = await axios.post('/sendArs', {
                destinyAccountId: CVU,
                amount: amount,
                description: description,
                token: sessionStorage.getItem('token'),
            })
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
})
