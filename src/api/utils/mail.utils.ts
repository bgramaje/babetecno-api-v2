/**
 * mails_lib
 * selectWarnings
 * @param {Array} mails 
 * @returns {Promise<Array>} of mails with warning status
 */
 export const getWarnings = async (mails: Array<any>): Promise<Array<any>> => {
    return mails.filter((el) => el.status === 'Warning')
}

/**
 * mails_lib
 * selectErrors
 * @param {Array} mails 
 * @returns {Promise<Array>} of mails with error/failure status
 */
export const getErrors = async (mails: Array<any>): Promise<Array<any>> => {
    return mails.filter((el) => el.status === 'Error')
}

/**
 * mails_lib
 * selectOK
 * @param {Array} mails 
 * @returns {Promise<Array>} of mails with OK/success status
 */
export const getSuccesses = async (mails: Array<any>): Promise<Array<any>> => {
    return mails.filter((el) => el.status === 'Success')
}