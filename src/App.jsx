import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Model from './Model';
import './App.css'
// import Button from 'react-bootstrap/Button';


import { Button, Container } from 'react-bootstrap';

export default function Crud() {

  let [tableData, setTableData] = useState(null);
  const [show, setShow] = useState(false);
  const [tempData, setTempData] = useState({});
  const [update, setUpdate] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = (value) => {
    setShow(true);
    setTempData(value);
  }

  useEffect(() => {
    fetch('https://67723b62ee76b92dd4918073.mockapi.io/user/user_data', {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    }).then(res => {
      if (res.ok) {
        return res.json();
      }

    }).then(tasks => {
      setTableData(tasks);
    }).catch(error => {
      console.log(error);
    })
  }, [update])
  console.log(tableData);

  const handleDelete = (id) => {
    // alert(id);

    fetch('https://67723b62ee76b92dd4918073.mockapi.io/user/user_data/${id}', {
      method: 'DELETE',
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      // handle error
    }).then(task => {
      alert("Deleted Successfully...!")
      setUpdate(!update);
      // Do something with deleted task
    }).catch(error => {
      // handle error
    })
  }
  // delete

  return (
    <>
      <h1>Student Profile Management</h1>
      <container fluid className='p-3 text-center'>
        <Table striped bordered hover variant='light'>
          <thead>

            <tr className='fs-3'>
              <th>S.No</th>
              <th>Name</th>
              <th>Email-Id</th>
              <th>Location</th>
              <th>Phone No</th>
              <th>Qualification</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className='fs-4 text-center'>
            {tableData && tableData.map((a, i) => (
              <tr>
                <td className='p-3'>{i + 1}</td>
                <td className='p-3'>{a.name}</td>
                <td className='p-3'>{a.emailId}</td>
                <td className='p-3'>{a.loaction}</td>
                <td className='p-3'>{a.phoneNo}</td>
                <td className='p-3'>{a.qualification}</td>
                <td>
                  <Button variant='success' onClick={() => handleShow(a)}>Edit</Button>&nbsp;
                  <Button variant='danger' onClick={() => handleDelete(a.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </container>

      {/* Model Box
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}

      <Model modify={update} setModify={setUpdate} status={show} close={handleClose} data={tempData} updateData={setTempData} />
    </>
  )
}