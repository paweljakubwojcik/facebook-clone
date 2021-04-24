module.exports = (googleData) => {
    return {
        urls: {
            thumbnail: googleData.picture,
            small: googleData.picture,
            medium: googleData.picture,
            large: googleData.picture,
        },
        createdAt: new Date().toISOString(),
        author: {
            name: googleData.name,
            link: null,
        },
        storageProvider: 'GOOGLE_AUTH',
    }
}
