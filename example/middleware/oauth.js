/**
 * This is a basic Express middleware
 * @param req
 * @param res
 * @param next
 */
export default function (req, res, next) {
    console.log('Hi we\'re checking the authorization header');

    next();
}