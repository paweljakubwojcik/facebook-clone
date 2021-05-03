// TODO: typescript would be really handy here

const sortingValues = {
    ASCENDING: 1,
    DESCENDING: -1,
}

/**
 *
 * @param {{key: any}} filter
 * @param {{limit: number , cursor: string, sortBy: string, sort: string}} paginationData
 * @param {obj} MongoDocument
 */
module.exports.getPaginatedResult = async (filter = {}, paginationData, MongoDocument) => {
    const { limit, cursor, sortBy = 'timestamp', sort: sortDir = 'DESCENDING' } = paginationData
    let sort = {}
    sort[sortBy] = sortingValues[sortDir]

    try {
        const index = await MongoDocument.findById(cursor)
        if (index) { //if cursor is not provided we want to return firsts elements from collections
            filter[sortBy] =
                sortDir === 'DESCENDING' ? { $lt: index[sortBy] } : { $gt: index[sortBy] }
        }

        const paginatedResult = await MongoDocument.find(filter, null, { sort, limit })

        return paginatedResult
    } catch (error) {
        throw error
    }
}

/**
 *
 * @param {{key: any}} filter
 * @param {{limit: number , cursor: string, sortBy: string, sort: string}} paginationData
 * @param {Array} array to be paginated
 */
module.exports.paginateResult = (filter = {}, paginationData, result) => {
    const { limit, cursor, sortBy = 'timestamp', sort: sortDir = 'DESCENDING' } = paginationData

    try {
        const paginatedResult = result.sort(
            (b, a) => (b[sortBy] - a[sortBy]) * sortingValues[sortDir]
        )
        const index = paginatedResult.findIndex(({ id }) => id.toString() === cursor) //currsor === undefined => index = -1
        const next = index + 1
        return paginatedResult.slice(next, next + limit)
    } catch (error) {
        throw error
    }
}
