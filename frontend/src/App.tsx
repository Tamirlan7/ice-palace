import {FC, Suspense} from "react";
import Router from "./routes/Router";
import { BrowserRouter } from 'react-router-dom';
import Header from "components/Header/Header";
import c from './App.module.scss'
import Loader from "UI/Loader/Loader";


const App: FC = () => {

    return (
        <BrowserRouter>
            <Suspense fallback={<Loader/>}>

            <div className={c.block}>
                <header>
                    <Header />
                </header>
                
                <main>
                    <Router />
                </main>
            </div>

            </Suspense>
        </BrowserRouter>
    )
}

export default App;
