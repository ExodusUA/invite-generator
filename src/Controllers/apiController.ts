import axios from 'axios';

class apiController {

    async treatCoinCallback(uid: string, requestID: string) {

        let offer = process.env.TREATCOIN_OFFER_ID
        let amount = process.env.TREATCOIN_AMOUNT
        let callbackKey = process.env.TREATCOIN_CALLBACK_KEY
        let provider = process.env.TREATCOIN_PROVIDER_ID
        console.log(`https://api.treatcoin.com/offer-postback?user=${uid}&offer=${offer}&requestID=${requestID}&amount=${amount}&provider=${provider}&callbackKey=${callbackKey}`)

        try {
            await axios.get(`https://api.treatcoin.com/offer-postback?user=${uid}&offer=${offer}&requestID=${requestID}&amount=${amount}&provider=${provider}&callbackKey=${callbackKey}`)

            console.log('Callback URL is called successfully')
        } catch (e) {
            console.log('Error while calling callback URL')
        }
    }

}

export default apiController;