
import { useState } from 'react'
import './App.css'

import { CPU } from './components/cpu'
import { User } from './components/user';
import { defaultDatabase, defaultDir, defaultDocker, defaultEnv, defaultUser } from './defaults';
import { Layout, VFlex } from './components/layout';
import { SideCollapsible } from './components/collapsible';
import { Env } from './components/env';
import { Docker } from './components/docker';
import { Dir } from './components/dir';
import { Database } from './components/database';

function App() {
    const defaultShouldShowCPU = (localStorage.getItem("app-should-show-cpu") || "false") === "true";
    const [shouldShowCPU, setShouldShowCPU] = useState<boolean>(defaultShouldShowCPU);
    const defaultShouldShowUser = (localStorage.getItem("app-should-show-user") || "false") === "true";
    const [shouldShowUser, setShouldShowUser] = useState<boolean>(defaultShouldShowUser);
    const defaultShouldShowEnv = (localStorage.getItem("app-should-show-env") || "false") === "true";
    const [shouldShowEnv, setShouldShowEnv] = useState<boolean>(defaultShouldShowEnv);
    const defaultShouldShowDocker = (localStorage.getItem("app-should-show-docker") || "false") === "true";
    const [shouldShowDocker, setShouldShowDocker] = useState<boolean>(defaultShouldShowDocker);
    const defaultShouldShowDir = (localStorage.getItem("app-should-show-dir") || "false") === "true";
    const [shouldShowDir, setShouldShowDir] = useState<boolean>(defaultShouldShowDir);
    const defaultShouldShowDatabase = (localStorage.getItem("app-should-show-database") || "false") == "true";
    const [shouldShowDatabase, setShouldShowDatabase] = useState<boolean>(defaultShouldShowDatabase);

    function updateShouldShowCPU() {
        setShouldShowCPU(!shouldShowCPU);
        localStorage.setItem("app-should-show-cpu", (!shouldShowCPU).toString());
    }

    function updateShouldShowUser() {
        setShouldShowUser(!shouldShowUser);
        localStorage.setItem("app-should-show-user", (!shouldShowUser).toString());
    }

    function updateshouldShowEnv() {
        setShouldShowEnv(!shouldShowEnv);
        localStorage.setItem("app-should-show-env", (!shouldShowEnv).toString());
    }

    function updateshouldShowDocker() {
        setShouldShowDocker(!shouldShowDocker);
        localStorage.setItem("app-should-show-docker", (!shouldShowDocker).toString());
    }

    function updateShouldShowDir() {
        setShouldShowDir(!shouldShowDir);
        localStorage.setItem("app-should-show-dir", (!shouldShowDir).toString());
    }

    function updateShouldShowDatabase() {
        setShouldShowDatabase(!shouldShowDatabase);
        localStorage.setItem("app-should-show-database", (!shouldShowDatabase).toString());
    }

    return (<div className="app">
        <h1 className="title primary">browser</h1>
        <Layout>
            <SideCollapsible title="tools">
                <VFlex>
                    <div className="button-container">
                        <button
                            aria-description="button"
                            className="button"
                            onClick={updateShouldShowCPU}
                        >
                            <input type="checkbox" checked={shouldShowCPU} readOnly /> cpu
                        </button>
                    </div>
                    <div className="button-container">
                        <button
                            aria-description="button"
                            className="button"
                            onClick={updateShouldShowUser}
                        >
                            <input type="checkbox" checked={shouldShowUser} readOnly /> user
                        </button>
                    </div>

                    <div className="button-container">
                        <button
                            aria-description="button"
                            className="button"
                            onClick={updateshouldShowEnv}
                        >
                            <input type="checkbox" checked={shouldShowEnv} readOnly /> env
                        </button>
                    </div>

                    <div className="button-container">
                        <button
                            aria-description="button"
                            className="button"
                            onClick={updateshouldShowDocker}
                        >
                            <input type="checkbox" checked={shouldShowDocker} readOnly /> docker
                        </button>
                    </div>

                    <div className="button-container">
                        <button
                            aria-description="button"
                            className="button"
                            onClick={updateShouldShowDir}
                        >
                            <input type="checkbox" checked={shouldShowDir} readOnly /> dir
                        </button>
                    </div>
                    <div className="button-container">
                        <button
                            aria-description="button"
                            className="button"
                            onClick={updateShouldShowDatabase}
                        >
                            <input type="checkbox" checked={shouldShowDatabase} readOnly /> database
                        </button>
                    </div>
                </VFlex>
            </SideCollapsible>
            <>
                {shouldShowCPU && <div className="component"><CPU /></div>}
                {shouldShowUser && <div className="component"><User initialUser={defaultUser} /></div>}
                {shouldShowEnv && <div className="component"><Env initialEnv={defaultEnv} /></div>}
                {shouldShowDocker && <div className="component"><Docker initialDocker={defaultDocker} /></div>}
                {shouldShowDir && <div className="component"><Dir initialDir={defaultDir} /></div>}
                {shouldShowDatabase && <div className="component"><Database /></div>}
            </>
        </Layout>
    </div >
    );
}

export default App
