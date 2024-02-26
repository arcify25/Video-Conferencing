import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom"
import { EuiProvider, EuiGlobalToastList, EuiThemeProvider, EuiThemeColorMode } from '@elastic/eui';
import "@elastic/eui/dist/eui_theme_light.css"
import "@elastic/eui/dist/eui_theme_dark.css"
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import "@elastic/eui/dist/eui_theme_dark.css"
import "@elastic/eui/dist/eui_theme_light.css"
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTextRange } from 'typescript';
import ThemeSelector from './components/ThemeSelector';
import CreateMeeting from './pages/CreateMeeting';
import OneonOneMeeting from './pages/OneonOneMeeting';
import { setToasts } from './app/slices/MeetingSlice';
import VideoConference from './pages/VideoConference';
import MyMeetings from './pages/MyMeetings';
import Meeting from './pages/Meeting';
import JoinMeeting from './pages/JoinMeeting';



function App() {
  const dispatch = useAppDispatch;
  const toasts = useAppSelector((zoom) => zoom.meetings.toasts);
  const isDarkTheme = useAppSelector((zoom) => zoom.auth.isDarkTheme);
  const [theme, setTheme] = useState<EuiThemeColorMode>("light");
  const [isInitialTheme, setIsInitialTheme] = useState(true);
  useEffect(() => {
    const theme = localStorage.getItem("zoom-theme");
    if (theme) {
      setTheme(theme as EuiThemeColorMode)
    } else {
      localStorage.setItem("zoom-theme", "light");
    }
  }, []);

  useEffect(() => {
    if (isInitialTheme) setIsInitialTheme(false);
    else {
      window.location.reload()
    }
  }, [isDarkTheme])



  const overrides = {
    colors: {
      LIGHT: { primary: "#0b5cff" },
      DARK: { primary: "#0b5cff" }
    }
  }
  // const overRides = {
  //   colors: {
  //     LIGHT: { primary: "#0b5cff" },
  //     DARK: { primary: "#14151a" }
  //   }
  // }


  const removeToast = (toastToRemove: { id: string }) => {
    // const updatedToasts = toasts.filter((toast: { id: string }) => toast.id !== toastToRemove.id);
    // dispatch(setToasts(updatedToasts));
  };


  return (
    <ThemeSelector>
      <EuiProvider colorMode={theme}>
        <EuiThemeProvider modify={overrides}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<CreateMeeting />} />
            <Route path="/create1on1" element={<OneonOneMeeting />} />
            <Route path="/videoconference" element={<VideoConference />} />
            <Route path="/mymeetings" element={<MyMeetings />} />
            <Route path="/meetings" element={<Meeting />} />
            <Route path="/join/:id" element={<JoinMeeting />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
          <EuiGlobalToastList toasts={toasts} dismissToast={removeToast}
            toastLifeTimeMs={5000} />
        </EuiThemeProvider>
      </EuiProvider>
    </ThemeSelector>
  );
}

export default App;