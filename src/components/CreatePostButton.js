import React, { Component, createRef } from "react";
import { Modal, Button, message } from "antd";
import axios from "axios";
import { BASE_URL, TOKEN_KEY } from "../constants";
import PostForm from './PostForm'


class CreatePostButton extends Component {
    state = {
        visible: false,
        confirmLoading: false,
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = () => {
        this.setState({
            confirmLoading: true,
        });
        // get form data
        this.postForm
            .validateFields()
            .then(form => {
                // step1: get info about message / image / video
                const {description, uploadPost} = form;
                const {type, originFileObj} = uploadPost[0];
                // step2: check file type: image / video
                const postType = type.match(/^(image|video)/g)[0];
                if(postType) {
                    // step3: prepare image / video date and send to the server
                    let formData = new FormData();
                    formData.append("message", description);
                    formData.append("media_file", originFileObj);

                    const opt = {
                        method: "POST",
                        url: `${BASE_URL}/upload`,
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
                        },
                        data: formData,
                    };

                    axios(opt)
                        .then(res => {
                            if (res.status === 200) {
                                message.success("This file has been uploaded successfully!");
                                this.postForm.resetFields();
                                this.handleCancel();
                                this.props.onShowPost(postType);
                                this.setState({confirmLoading: false});
                            }
                        })
                        .catch(err => {
                            console.log("Upload media file failed: ", err, message);
                            message.error("Failed to upload media file.");
                            this.setState({confirmLoading: false});
                        })
                }
            })
            .catch( err => {
                console.log("error in validate form: ", err);
            })
    };
    handleCancel = () => {
        console.log("clicked cancel button");
        this.setState({
            visible: false,
        });
    }
    render() {
        const {visible, confirmLoading} = this.state;
        return (
            <div>
                <Button
                    type="primary"
                    onClick={this.showModal}>
                    Create New Post
                </Button>
                <Modal
                    title="Create New Post"
                    visible={visible}
                    onOk={this.handleOk}
                    okText="Create"
                    onCancel={this.handleCancel}
                    confirmLoading={confirmLoading}
                >
                    <PostForm ref={(refInstance) => (this.postForm = refInstance)}/>
                </Modal>
            </div>
        );
    }
}

export default CreatePostButton;
