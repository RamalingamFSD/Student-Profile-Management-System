import { useEffect } from 'react';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function Model(props) {
    const { name, emailId, loaction, phoneNo, qualification } = props.data;
    console.log(name);

    const saveChanges = () => {

        fetch(`https://67723b62ee76b92dd4918073.mockapi.io/user/user_data/${props.data.id}`, {
            method: 'PUT', // or PATCH
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(props.data)
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            // handle error
        }).then(task => {
            alert("Update");
            props.setModify(!props.modify);

            // Do something with updated task
        }).catch(error => {
            // handle error
        })
        props.close();
    }
    return (
        <>
            < Modal show={props.status} onHide={props.close} >
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                defaultValue={name}
                                onChange={(e) => props.updateData({ ...props.data, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name="emailId"
                                placeholder="name@example.com"
                                autoFocus
                                defaultValue={emailId}
                                onChange={(e) => props.updateData({ ...props.data, emailId: e.target.value })}

                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                name="loaction"
                                autoFocus
                                defaultValue={loaction}
                                onChange={(e) => props.updateData({ ...props.data, loaction: e.target.value })}

                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Phone No</Form.Label>
                            <Form.Control
                                type="tel"
                                name="phoneNo"
                                autoFocus
                                defaultValue={phoneNo}
                                onChange={(e) => props.updateData({ ...props.data, phoneNo: e.target.value })}

                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Qualification</Form.Label>
                            <Form.Control
                                type="text"
                                name="qualification"
                                autoFocus
                                defaultValue={qualification}
                                onChange={(e) => props.updateData({ ...props.data, qualification: e.target.value })}

                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={props.close}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}

export default Model;