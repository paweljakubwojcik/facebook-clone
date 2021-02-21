import React from 'react'
import Modal from '../Components/General/Modal'
import Form from '../Components/General/Form'

export default function PostForm() {
    return (
        <Modal>
            <Form>
                <Form.Header>{"Let's fake some posts"}</Form.Header>
            </Form>
        </Modal>
    )
}
