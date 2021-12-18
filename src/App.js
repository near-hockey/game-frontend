import React, {useState} from 'react';
import Navigation from "./components/Navigation";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import * as ROUTES from './constants/routes';
import styled from "styled-components";
import BuyPacks from "./components/marketplace/BuyPacks";
import BuyPlayers from "./components/marketplace/BuyPlayers";
import SellPlayers from "./components/marketplace/SellPlayers";
import Login from "./components/auth/Login";
import BuyPack from "./components/marketplace/BuyPack";
import BuyPlayer from "./components/marketplace/BuyPlayer";
import SellPlayer from "./components/marketplace/SellPlayer";
import PackView from "./components/marketplace/PackView";
import {config} from "./app/near";
import {connect, WalletConnection} from "near-api-js";

const AppStyled = styled.div`
  min-height: 100vh;
  
  // fix indent for bottom navbar
  padding-bottom: 55px;
`

function App() {
    const [fullFilled, setFullFilled] = useState(false);
    const [signed, setSigned] = useState(false);

    let wallet;
    connect(config).then(near => {
        wallet = new WalletConnection(near);
        setFullFilled(true);
        setSigned(wallet.isSignedIn());
    }
    );


  return (
    <AppStyled>
      <BrowserRouter>
        { fullFilled && signed ? <>
              <Navigation />
              <Routes>
                <Route exact path={ROUTES.ROOT} element={<BuyPlayers />} />
                <Route path={ROUTES.MARKETPLACE} element={<BuyPlayers />} />
                <Route path={ROUTES.MARKETPLACE_BUY_PLAYERS} element={<BuyPlayers />} />
                <Route path={`${ROUTES.MARKETPLACE_BUY_PLAYERS}/:id`} element={<BuyPlayer />} />
                <Route path={ROUTES.MARKETPLACE_BUY_PACKS} element={<BuyPacks />} />
                <Route path={ROUTES.MARKETPLACE_PACK_VIEW} element={<PackView />} />
                <Route path={`${ROUTES.MARKETPLACE_BUY_PACKS}/:id`} element={<BuyPack />} />
                <Route path={ROUTES.MARKETPLACE_SELL_PLAYERS} element={<SellPlayers />} />
                <Route path={`${ROUTES.MARKETPLACE_SELL_PLAYERS}/:id`} element={<SellPlayer />} />
              </Routes>
            </> : <>
          <Login />
        </>
        }
      </BrowserRouter>
    </AppStyled>
  );
}

export default App;
