import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap';

const Footer = () => {
    return (
        <Container className='d-flex justify-content-center'>
            <Row className='py-4' >
                <Col>
                    <p style={{ margin: '0 auto' }}>©2024 por NutriKal.</p>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer