// TODO: typescript would be really handy here
/**
 *
 * @param {{key: any}} filter
 * @param {{limit: number , cursor: string, sortBy: string, sort: string}} paginationData
 * @param {obj} MongoDocument
 */
module.exports.getPaginatedResult = async (filter = {}, paginationData, MongoDocument) => {
    const { limit, cursor, sortBy = 'createdAt', sort: sortDir = 'DESCENDING' } = paginationData
    let sort = {}
    const sortingValues = {
        ASCENDING: 1,
        DESCENDING: -1,
    }
    sort[sortBy] = sortingValues[sortDir]

    try {
        const paginatedResult = await MongoDocument.find(filter, null, { sort })
        const index = paginatedResult.findIndex(({ _id }) => _id.toString() === cursor) //currsor === undefined => ined = -1
        const next = index + 1
        return paginatedResult.slice(next, next + limit)
    } catch (error) {
        throw error
    }
}
