const cursorPagination = {
    merge(existing, incoming, { readField, canRead }) {
        const merged = { ...existing }
        incoming.forEach((item) => {
            merged[readField('id', item)] = item
        })

        return merged
    },

    // Return all items stored so far, to avoid ambiguities
    // about the order of the items.
    read(existing, { readField, args, fieldName, canRead }) {
        const { paginationData } = args
        if (!paginationData)
            throw new Error(
                `to use cursorPagination with ${fieldName} you must include paginationData variable in query`
            )
        const { sort = 'DESCENDING', sortBy = 'timestamp' } = paginationData

        if (existing) {
            let sorted = Object.values(existing).filter((obj) => canRead(obj)) // filter out dangling references
            if (sorted.length < 2) return sorted
            sorted.sort((b, a) => {
                const later = readField(sortBy, a)
                const prior = readField(sortBy, b)
                if (typeof later !== 'number' || typeof prior !== 'number')
                    console.warn(
                        `attempt to sort by field ${sortBy} which is not a number, this will not affect the order of stored objects`
                    )
                if (typeof later === 'undefined' || typeof prior === 'undefined')
                    console.warn(`can't read field ${sortBy} on ${fieldName}`)

                if (sort === 'DESCENDING') return later - prior
                if (sort === 'ASCENDING') return prior - later
                throw new Error(
                    `sort value on paginationData can only be "ASCENDING" or "DESCENDING" , got ${sort} instead`
                )
            })

            return sorted
        }
        return false
    },
}

export default cursorPagination
