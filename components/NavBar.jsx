import React, { useEffect, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Link from 'next/link'
import Modal from 'react-bootstrap/Modal'

export default function NavBar() {
    const [show, setShow] = useState(false);

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Link href="/Home" passHref>
                    <Navbar.Brand href="">PP lotto</Navbar.Brand>
                </Link>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link>เพิ่มเล่ม</Nav.Link>
                        <Nav.Link>เล่มทั้งหมด</Nav.Link>
                        <Link href="/Test" passHref>
                            <Nav.Link>ผลการชน</Nav.Link>
                        </Link>

                    </Nav>
                    <Nav>
                        <Link href="/" passHref>
                            <Nav.Link onClick={() => setShow(true)}>ออกจากระบบ</Nav.Link>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Modal
                show={show}
                onHide={() => setShow(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Custom Modal Styling
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
                        commodi aspernatur enim, consectetur. Cumque deleniti temporibus
                        ipsam atque a dolores quisquam quisquam adipisci possimus
                        laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
                        accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
                        reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
                        deleniti rem!
                    </p>
                </Modal.Body>
            </Modal>
        </div>
    )
}
