/**
 * checks version of node and prompts error when version mismatches
 *
 * @param {Number} expectedVersion - expected version of node, ex. 12 will match all 12.* versions
 */

module.exports = (expectedVersion) => {
    if (typeof expectedVersion !== 'number') {
        console.warn('incorrect parameter type in checkNodeVersion')
        return
    }

    const v = process.versions.node
    const isRequiredVersion = v.match(new RegExp(`(^${expectedVersion}.)+`, 'g'))
    if (!isRequiredVersion)
        console.error(
            '\x1b[31m%s\x1b[0m',
            ` Your node version is : ${v} \n This project requires node ${expectedVersion}`
        )
}
