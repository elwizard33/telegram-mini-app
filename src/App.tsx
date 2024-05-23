import { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import axios from 'axios';
import { AppDispatch, RootState } from './redux/store';

import { useDispatch, useSelector } from 'react-redux';
import { setConnectionState } from './redux/connectionSlice';

enum View {
    LANDING = 0,
    CONNECT = 1,
    CONNECTED = 2,
    WALLET = 3,
    MAIN = 4,
}

WebApp.setHeaderColor('#1a1a1a');

const BRIDGE_URL = import.meta.env.VITE_BRIDGE_URL || '';

function App() {
    const [view, setView] = useState<View>(View.LANDING);

    // Connection State
    const connectionState = useSelector(
        (state: RootState) => state.connection.connectionState
    );

    const dispatch = useDispatch<AppDispatch>();

    const skip = () => {
        setView(view + 1);
    };
    const goBack = () => {
        if (view === View.LANDING) {
            return;
        }
        setView(view - 1);
    };

    const openMain = () => {
        setView(View.MAIN);
    };

    // Get Accounts
    const [account, setAccount] = useState<string | null>(null);
    const [balance, setBalance] = useState<string | null>(null);

    const getAccountData = async () => {
        const providerId = window.localStorage.getItem('providerId');
        if (!providerId) {
            console.error('Provider ID not found.');
            return;
        }
        try {
            const response = await axios.get(`${BRIDGE_URL}/account/${providerId}`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                },
            });
            setAccount(response.data.account);
            setBalance(response.data.balance);
        } catch (error) {
            console.error('Error fetching account data:', error);
        }
    };

    const handleConnect = () => {
        setView(View.CONNECTED);
    };

    // Handle MainButton changes on view change
    useEffect(() => {
        if (view === View.CONNECTED) {
            getAccountData();
        }
    }, [view]);

    // Disconnect
    const handleDisconnect = async () => {
        WebApp.showConfirm(
            'Are you sure you want to disconnect?',
            async (confirmed: boolean) => {
                if (!confirmed) return;
                window.localStorage.removeItem('providerId');
                window.localStorage.removeItem('walletConnectURI');
                window.localStorage.removeItem('walletProvider');
                window.localStorage.removeItem('walletconnect');
                window.localStorage.removeItem('WALLETCONNECT_DEEPLINK_CHOICE');
                dispatch(setConnectionState('disconnected'));
                setView(View.CONNECT);

                try {
                    await axios.post(`${BRIDGE_URL}/disconnect`, {
                        providerId: window.localStorage.getItem('providerId'),
                    });
                } catch (error) {
                    console.error('Error during disconnect:', error);
                }
            }
        );
    };

    return (
        <div className="flex flex-col h-full min-h-screen w-screen rounded-xl bg-customGrayWallet">
            {view === View.LANDING && (
                <div className="flex flex-col flex-grow min-h-full justify-end">
                    <div className="components-container mb-2">
                        <button onClick={skip}>Skip</button>
                        <div className="flex flex-col bg-white pt-4 pr-8 pb-8 pl-8 gap-4 rounded-t-3xl rounded-b-xl shadow-custom-white">
                            <div>
                                <h2 className="headline">
                                    Telegram Mini App Demo
                                </h2>
                            </div>
                            <div>
                                <p className="text-customGrayText mt-0 mr-0 mb-4 ml-0">
                                    Click on the button below and follow the
                                    instructions to link your wallet to this
                                    telegram mini app demo.
                                </p>
                                <p className="text-customGrayText mt-0 mr-0 mb-4 ml-0">
                                    Softstack is a Web3 software development,
                                    cybersecurity and consulting service
                                    partner.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 mb-4">
                        <button onClick={skip}>Connect Your Wallet</button>
                    </div>
                </div>
            )}
            {view === View.CONNECT && (
                <div className="components-container">
                    <div className="flex justify-between">
                        <button onClick={goBack}>Back</button>
                        {connectionState === 'connected' && (
                            <button onClick={skip}>Skip</button>
                        )}
                    </div>
                    <div className="flex flex-col absolute w-full bottom-0 bg-white pt-4 px-8 pb-14 gap-4 rounded-t-3xl rounded-b-xl shadow-custom-white">
                        <h2 className="headline">CONNECT</h2>
                        {/* Add your connect modals here */}
                    </div>
                </div>
            )}
            {view === View.CONNECTED && (
                <>
                    <div className="components-container mb-2">
                        <button onClick={goBack}>Back</button>
                        <div className="flex flex-col bg-white pt-4 px-8 pb-2 min-h-fit gap-2 rounded-t-3xl rounded-b-xl shadow-custom-white">
                            <h2 className="headline">HORRAY!</h2>
                            <div className="text-xs break-all font-semibold text-center text-customGrayAddress">
                                <p className="my-0 mx-auto">{account}</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="flex justify-between items-center gap-4 text-lg font-semibold">
                                    <p className="m-0">Total Balance</p>
                                    <p className="text-2xl font-bold mb-4">{balance || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 p-2 mb-4">
                        <button onClick={openMain}>Open Main</button>
                        <button onClick={handleDisconnect} className="bg-red-200 border border-red-300 active:bg-red-300">
                            Disconnect
                        </button>
                    </div>
                </>
            )}
            {view === View.MAIN && (
                <div className="flex flex-col items-center justify-center h-full bg-white">
                    <h1 className="text-4xl font-bold mb-8">My GPT Wizard</h1>
                    <div className="grid grid-cols-2 gap-4 w-full px-4">
                        {[
                            "Email Generator",
                            "Meme Generator",
                            "Live Chat",
                            "Marketing Plan Generator",
                            "Article Summarizer",
                            "Code Debugger",
                            "Image Captioner",
                            "Personal Assistant",
                            "Recipe Finder",
                            "Travel Planner"
                        ].map((tool) => (
                            <div key={tool} className="flex items-center justify-center bg-gray-200 rounded-lg h-32 shadow-md">
                                <p className="text-xl font-semibold">{tool}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;