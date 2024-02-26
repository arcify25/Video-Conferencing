import React from 'react';
import { EuiContext, EuiProvider, EuiThemeSystem, EuiText, EuiTextColor, EuiFlexGroup, EuiFlexItem, EuiPanel, EuiThemeProvider, EuiImage, EuiSpacer, EuiButton, EuiThemeAmsterdam } from '@elastic/eui';
import animation from "../assets/animation.gif";

import logo from "../assets/logo.png"
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { addDoc } from 'firebase/firestore';
import { getDocs, query, where } from 'firebase/firestore';
import { firebaseAuth, userRef } from '../util/FireBaseConfig';
import { useNavigate } from 'react-router-dom';
import { setUser } from "../app/slices/AuthSlice";
import { useAppDispatch } from "../app/hooks";
function Login() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) {
            navigate("/");
        }
    });

    const login = async () => {
        const provider = new GoogleAuthProvider();
        const {
            user: { displayName, email, uid },
        } = await signInWithPopup(firebaseAuth, provider);
        if (email) {
            const firestoreQuery = query(userRef, where("uid", "==", uid));
            const fetchedUsers = await getDocs(firestoreQuery);
            if (fetchedUsers.docs.length === 0) {
                await addDoc(userRef, {
                    email,
                    name: displayName,
                    uid,
                });
            }
        }
        dispatch(setUser({ uid, name: displayName, email }));
        navigate("/");
    };
    return (
        <EuiProvider>
            <EuiThemeProvider theme={EuiThemeAmsterdam}>
                <EuiFlexGroup justifyContent='center' alignItems='center' style={{ width: "100vw", height: "100vh" }} >
                    <EuiFlexItem grow={false}>
                        <EuiPanel paddingSize='xl'>

                            <EuiFlexGroup justifyContent='center' alignItems='center'>
                                <EuiFlexItem>
                                    <EuiImage src={animation} alt="logo" />
                                </EuiFlexItem>
                                <EuiFlexItem>
                                    <EuiImage src={logo} alt="logo" size="230px" />
                                    <EuiSpacer size='xs' />
                                    <EuiText textAlign='center'>
                                        <h3 >
                                            <EuiTextColor>One Platform to</EuiTextColor>
                                            <EuiTextColor color='#0b5cff'> Connect</EuiTextColor>
                                        </h3>
                                    </EuiText>

                                    <EuiSpacer size='l' />
                                    <EuiButton fill color="primary" onClick={login}>
                                        Login with Google
                                    </EuiButton>
                                </EuiFlexItem>
                            </EuiFlexGroup>

                        </EuiPanel>
                    </EuiFlexItem>
                </EuiFlexGroup>
            </EuiThemeProvider>
        </EuiProvider>

    );
}

export default Login;