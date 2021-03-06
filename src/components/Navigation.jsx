import React, {useEffect, useState} from "react";
import {Container, Navbar, Nav, NavItem, Button} from "react-bootstrap";
import styled from "styled-components";
import * as ROUTES from './../constants/routes';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHockeyPuck, faBriefcase, faStore, faStar, faCoins} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";
import {ReactComponent as NearLogo} from "../assets/near-logo.svg";
import {useDispatch} from "react-redux";
import {signOutAsync} from "../features/counter/counterSlice";
import {config} from "../app/near";
import {connect, WalletConnection, utils} from "near-api-js";

const NavigationStyled = styled.div`
  .navbar {
    border-bottom: solid 1px #EBEBEB;
  }
  .bottom-tab-nav {
    border: none;
  }
  .nav-link svg,
  .bottom-nav-link svg {
    color: #55575b;
  }
  
  .top-nav-link {
    color: white;
    text-decoration: none;
  }
`

const NavbarBrandStyled = styled(Navbar.Brand)`
  font-size: 1.5rem;
`

const tabs = [
    {
        route: ROUTES.MARKETPLACE,
        icon: faStore,
    },
    {
        route: ROUTES.GAME,
        icon: faHockeyPuck,
    },
    {
        route: ROUTES.MARKETPLACE,
        icon: faBriefcase,
    },
]

export default function Navigation() {
    const [balance, setBalance] = useState('');
    const dispatch = useDispatch();

    useEffect(()=> {
        connect(config).then(near => {
            let wallet = new WalletConnection(near);
            let walletAccountId = wallet.getAccountId();
            near.account(walletAccountId).then(account => {
                account.getAccountBalance().then(_balance => {
                    setBalance(utils.format.formatNearAmount(_balance.available).slice(0, -14));
                })
            })
        });
    }, []);

    return <NavigationStyled>
        <Navbar className='navbar-expand-lg d-none d-md-block sticky-top' bg='dark' variant='dark'>
            <Container fluid className="justify-content-center">
                <Navbar.Brand href={ROUTES.ROOT}>
                    <img src='/img/nft-hockey-logo.png' alt='logo' width="60"/>
                </Navbar.Brand>
                <NavLink activeClassName='active' to={ROUTES.ROOT} className='nav-link'>
                    <NavbarBrandStyled><b>NFT HOCKEY</b></NavbarBrandStyled>
                </NavLink>
                <Nav className='ml-auto'>
                    <NavItem className="m-3">
                        <NavLink to={ROUTES.GAME} className='nav-link' activeClassName='active'>
                            <FontAwesomeIcon icon={faHockeyPuck} size="2x" color='red' />
                        </NavLink>
                    </NavItem>
                    <NavItem className="m-3">
                        <NavLink to={ROUTES.MARKETPLACE} className='nav-link' activeClassName='active'>
                            <FontAwesomeIcon icon={faStore} size="2x" />
                        </NavLink>
                    </NavItem>
                    <NavItem className="m-3">
                        <NavLink to={ROUTES.ROOT} className='nav-link' activeClassName='active'>
                            <FontAwesomeIcon icon={faBriefcase} size="2x" />
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to='#' className='nav-link' activeClassName='active'>
                        <h4 className='text-light mt-3'><FontAwesomeIcon icon={faStar} className='text-warning' /> 200</h4>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to='#' className='nav-link' activeClassName='active'>
                        <h4 className='mt-3'><NearLogo fill='#FFC107' height='25' /> {balance}</h4>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to='#' className='nav-link' activeClassName='active'>
                        <h4 className='text-light mt-3'><FontAwesomeIcon icon={faCoins}  className='text-warning' /> 813</h4>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to='#' className='nav-link' activeClassName='active'>
                            <Button size='sm' variant='outline-secondary' onClick={()=>dispatch(signOutAsync())}>Sign out</Button>
                        </NavLink>
                    </NavItem>
                </Nav>
            </Container>
        </Navbar>
        <Navbar className='sticky-top d-block d-md-none' bg='dark' variant='dark'>
            <Nav className='w-100'>
                <div className="d-flex flex-row justify-content-around w-100">
                    <NavItem>
                        <NavLink to='#' className='top-nav-link' activeClassName='active'>
                            <FontAwesomeIcon icon={faStar} className='text-warning' /> 200
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to='#' className='top-nav-link' activeClassName='active'>
                            <NearLogo fill='#FFC107' height='18' /> 8
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to='#' className='top-nav-link' activeClassName='active'>
                            <FontAwesomeIcon icon={faCoins} className='text-warning' /> 813
                        </NavLink>
                    </NavItem>
                </div>
            </Nav>
        </Navbar>
        <Navbar className='fixed-bottom d-block d-md-none bottom-tab-nav' bg='dark' variant='dark'>
            <Nav className='w-100'>
                <div className='d-flex flex-row justify-content-around w-100'>
                    {
                        tabs.map((tab, index) =>
                            <NavItem key={`tab-${index}`}>
                                <NavLink to={tab.route} className='nav-link bottom-nav-link' activeClassName='active'>
                                    <FontAwesomeIcon icon={tab.icon} size='lg' />
                                </NavLink>
                            </NavItem>
                        )
                    }
                </div>
            </Nav>
        </Navbar>
    </NavigationStyled>
}