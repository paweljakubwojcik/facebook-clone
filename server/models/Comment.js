const { model, Schema } = require('mongoose')
const Entity = require('./Entity')

const commentSchema = new Schema({
    group: {
        type: Schema.Types.ObjectId,
        ref: 'groups',
    },
})

module.exports = Entity.discriminator('Comment', commentSchema)
