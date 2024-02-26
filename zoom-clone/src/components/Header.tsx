import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { EuiContext, EuiProvider, EuiCard, EuiText, EuiButtonIcon, EuiTextColor, EuiFlexGroup, EuiFlexItem, EuiPanel, EuiThemeProvider, EuiImage, EuiSpacer, EuiButton, EuiHeader, EuiForm } from '@elastic/eui';
import { setUser, changeTheme } from "../app/slices/AuthSlice";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../util/FireBaseConfig";
import { log } from "console";
import { getCreateMeetingBreadCrumbs, getOneonOneMeetingBreadCrumbs, getVideoConferenceMeetingBreadCrumbs, getMyMeetingBreadCrumbs, getMeetingsBreadCrumbs } from "../util/breadCrumbs";



function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const logout = () => {
        signOut(firebaseAuth);
    }
    const username = useAppSelector(zoom => zoom.auth.userInfo?.name);
    const [breadCrumbs, setbreadcrumbs] = useState([{ text: "Dashboard" }]);
    const [isResponsive, setIsResponsive] = useState(false);
    const dispatch = useDispatch();
    const isDarkTheme = useAppSelector((zoomApp) => zoomApp.auth.isDarkTheme);


    useEffect(() => {
        const { pathname } = location;
        if (pathname === "/create") setbreadcrumbs(getCreateMeetingBreadCrumbs(navigate));
        else if (pathname === "/create1on1") setbreadcrumbs(getOneonOneMeetingBreadCrumbs(navigate))
        else if (pathname === "/videoconference") setbreadcrumbs(getVideoConferenceMeetingBreadCrumbs(navigate))
        else if (pathname === "/mymeetings") setbreadcrumbs(getMyMeetingBreadCrumbs(navigate))
        else if (pathname === "/meetings") setbreadcrumbs(getMeetingsBreadCrumbs(navigate))
    }, [location, navigate])


    const invertTheme = () => {
        const theme = localStorage.getItem("zoom-theme");
        localStorage.setItem("zoom-theme", theme === "light" ? "dark" : "light");
        dispatch(changeTheme({ isDarkTheme: !isDarkTheme }));
    };

    const section = [{
        items: [
            <Link to="/">
                <EuiText>
                    <h1 style={{ padding: "0 1vw" }}>
                        <EuiTextColor color="#fffff3" >Re-</EuiTextColor>
                        <EuiTextColor color="#fca311">Connect</EuiTextColor>
                    </h1>
                </EuiText>
            </Link>,
        ],
    },
    {
        items: [
            <>{
                username ? (
                    <EuiText><h3>
                        <EuiTextColor color="white">Hello, </EuiTextColor>
                        <EuiTextColor color="#fca311">{username}</EuiTextColor>
                    </h3></EuiText>
                ) : null
            },
            </>,
        ]
    },
    {
        items: [
            <EuiFlexGroup justifyContent="center" alignItems="center" direction="row" style={{ gap: "2vw " }}>
                <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
                    {isDarkTheme ? (
                        <EuiButtonIcon
                            onClick={invertTheme}
                            iconType="sun"
                            display="fill"
                            size="s"
                            color="warning"
                            aria-label="theme-button-light"
                        />
                    ) : (
                        <EuiButtonIcon
                            onClick={invertTheme}
                            iconType="moon"
                            display="fill"
                            size="s"
                            color="primary"
                            aria-label="theme-button-dark"
                        />
                    )}</EuiFlexItem>
                <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>


                    <EuiButtonIcon onClick={logout} iconType="lock" display="fill" size="s" aria-label="logout-button" />

                </EuiFlexItem>
            </EuiFlexGroup>
        ]
    },

    ];

    const responsiveSection = [
        {
            items: [
                <Link to="/">
                    <EuiText>
                        <h2 style={{ padding: "0 1vw" }}>
                            <EuiTextColor color="#0b5cff">Zoom</EuiTextColor>
                        </h2>
                    </EuiText>
                </Link>,
            ],
        },
        {
            items: [
                <EuiFlexGroup justifyContent="center" alignItems="center" direction="row" style={{ gap: "2vw " }}>
                    <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
                        {isDarkTheme ? (
                            <EuiButtonIcon onClick={invertTheme}
                                iconType="sun"
                                display="fill"
                                size="s"
                                color="warning"
                                aria-label="invertTheme-button"
                            />
                        ) : (
                            <EuiButtonIcon onClick={invertTheme}
                                iconType="moon"
                                display="fill"
                                size="s"
                                color="primary"
                                aria-label="invertTheme-button"

                            />

                        )}
                    </EuiFlexItem>
                    <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>


                        <EuiButtonIcon onClick={logout} iconType="lock" display="fill" size="s" aria-label="logout-button" />

                    </EuiFlexItem>
                </EuiFlexGroup>
            ]
        }

    ];


    useEffect(() => {
        if (window.innerHeight < 480) setIsResponsive(true);
    }, []);

    return <>
        <EuiHeader style={{ minHeight: "8vh" }} theme="dark" sections={isResponsive ? responsiveSection : section} />
        <EuiHeader style={{ minHeight: "8vh" }} sections={[{
            breadcrumbs: breadCrumbs
        }
        ]} />
    </>
}

export default Header;