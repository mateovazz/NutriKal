import React from 'react';
import comida from '../img/comida.webp';
import { Container, Row, Col, Image } from 'react-bootstrap';

const FotoTexto = () => {
    return (
        <Container >
            <Row className='d-flex align-items-center' style={{ height: '100vh' }}>
                <Col>
                    <img src={comida} alt="Plato de comida" className="img-fluid" style={{ height: '600px', width: 'auto', borderRadius: '10px' }} />
                </Col>
                <Col>
                    <h1>El mundo de NutriKal</h1>
                    <h4>Relájate y disfruta</h4>
                    <p>Bienvenido a la página web oficial! Aquí encontrarás todo para cuidar de tu vida. ¡Disfrútalo!</p>
                </Col>
            </Row>
        </Container>
    );
};

export default FotoTexto;
