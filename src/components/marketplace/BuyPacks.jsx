import React from "react";
import {Container, InputGroup, FormControl, Row, Col, Card, Button, Image} from "react-bootstrap";
import MarketplacePageSelector from "./MarketplacePageSelector";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import DoublePrice from "./DoublePrice";

export default function BuyPacks() {
    const navigate = useNavigate();

    return <>
    <MarketplacePageSelector selectedPage='buy-packs' />
    <Container>
        <Row>
            <Col className='col-12 col-lg-4'>
                <h1 className='text-center my-3'>Packs</h1>
            </Col>
            <Col className='pt-4'>
                <InputGroup className="mb-5 align-self-center">
                    <InputGroup.Text><FontAwesomeIcon icon={faSearch} /> </InputGroup.Text>
                    <FormControl id="inlineFormInputGroup" placeholder="Search" />
                </InputGroup>
            </Col>
        </Row>
        <Row>
            <Col className='col-12 col-md-4 mb-3'>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col className='text-center col-sm-12 col-md-auto'>
                                <Image rounded src='/img/player.png' alt='player' height='250px'/>
                            </Col>
                            <Col className='text-center col-auto mt-3'>
                                <Card.Title>Pack name</Card.Title>
                                <Card.Text className='text-start'>Pack info</Card.Text>
                                <DoublePrice dollar={100} near={10} />
                                <Button
                                className='text-center rounded-pill'
                                variant="dark"
                                onClick={()=>navigate('/marketplace/buy-packs/3')}
                                >Buy a pack</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
    </>
}