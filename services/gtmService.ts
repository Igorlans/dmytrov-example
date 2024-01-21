//@ts-nocheck
class GtmService {
     unregisteredOrderClick() {
         window.dataLayer = window?.dataLayer || [];
         window.dataLayer.push({
             'event': 'unregisteredOrderClick',
         });
    }

    registrationCompleted() {
        window.dataLayer = window?.dataLayer || [];
        window.dataLayer.push({
            'event': 'registrationCompleted',
        });
    }
}

export const gtmService = new GtmService()

export default GtmService;