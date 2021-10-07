/* This is file for changin global configuration settings */

const allowedConditions = [ "brand new", "new", "slightly used", "used", "worn", "damaged" ]

const blockedUsernames =  [ 'signup', 'signin', 'signout', 'all', 'whoami' ];

const allowedCurrencies = [ 'USD', ]

const allowedFileTypes = [ 'jpg', 'png', 'jpeg' ]

const loginTypes = [ "local", "google", "facebook" ]


export  { allowedConditions, blockedUsernames, allowedCurrencies, allowedFileTypes, loginTypes };
