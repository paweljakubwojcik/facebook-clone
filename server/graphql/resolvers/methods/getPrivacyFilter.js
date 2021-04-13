const checkAuth = require('../../../utils/checkAuth')
const User = require('../../../models/User')

module.exports = async ({ userId, context, initialFilter }) => {
    let filter = initialFilter
    const user = checkAuth(context)
    if (userId) filter.user = userId
    if (user) {
        const { friends } = await User.findById(user.id)
        filter = {
            ...filter,
            $or: [
                { privacy: 'PUBLIC' },
                {
                    privacy: ['PRIVATE', 'FRIENDS_ONLY'],
                    user: user.id,
                },
                { privacy: ['FRIENDS_ONLY'], user: friends },
            ],
        }
    } else filter.privacy = 'PUBLIC'

    return filter
}
