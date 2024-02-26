import React from 'react'
import DarkTheme from '../Themes/DarkTheme';
import LightTheme from '../Themes/LightTheme';
import { EuiFieldText, EuiFormRow, EuiThemeProvider, useEuiTheme } from '@elastic/eui'
import ThemeSelector from '../ThemeSelector';

function MeetingNameField({ label,
  placeholder,
  value,
  setMeetingName, isInvalid, error }: {
    label: string,
    placeholder: string,
    value: string,
    setMeetingName: React.Dispatch<React.SetStateAction<string>>,
    isInvalid: boolean,
    error: Array<string>
    ;

  }) {


  return (
    <EuiThemeProvider >

      <EuiFormRow label={label} isInvalid={isInvalid} error={error}>
        <EuiFieldText placeholder={placeholder} value={value}
          isInvalid={isInvalid} onChange={(e) => setMeetingName(e.target.value)} />
      </EuiFormRow>
    </EuiThemeProvider>

  )
}

export default MeetingNameField