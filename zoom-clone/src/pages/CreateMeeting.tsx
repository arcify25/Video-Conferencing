import React from 'react'
import Header from '../components/Header';
import useAuth from '../hooks/useAuth';
import meeting1 from "../assets/meeting1.png";
import meeting2 from "../assets/meeting2.png";
import { EuiContext, EuiProvider, EuiCard, EuiText, EuiTextColor, EuiFlexGroup, EuiFlexItem, EuiPanel, EuiThemeProvider, EuiImage, EuiSpacer, EuiButton } from '@elastic/eui';
import { useNavigate } from 'react-router-dom';


function CreateMeeting() {
  useAuth();
  const navigate = useNavigate();
  return (
    <div style={{
      display: "flex",
      height: "100vh",
      flexDirection: "column",
    }}>
      <Header />
      <EuiFlexGroup justifyContent="center" alignItems="center" style={{ margin: "5vh 10vw" }}>
        <EuiFlexItem>
          <EuiCard icon={<EuiImage size="100%" alt="icon" src={meeting1} />}
            title={'Create 1 On 1 Meeting'}
            description="Create a Single Person Meeting."
            onClick={() => navigate('/create1on1')}
            paddingSize="xl"
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard icon={<EuiImage size="100%" alt="icon" src={meeting2} />}
            title={'Create Video Conference Meeting'}
            description="Invite People to a Meeting."
            onClick={() => navigate('/videoconference')}
            paddingSize="xl"
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  )
}

export default CreateMeeting