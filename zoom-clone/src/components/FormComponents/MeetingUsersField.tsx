import React from 'react'
import { EuiFieldText, EuiForm, EuiFormRow, EuiThemeProvider, useEuiTheme, EuiComboBox } from '@elastic/eui'


function MeetingUserField({ label, options, onChange, selectedOptions, isClearable, placeholder, singleSelection = false, isInvalid, error }: {
    label: string, options: any, isClearable: boolean, selectedOptions: any, placeholder: string, onChange: any, singleSelection: any, isInvalid: boolean,
    error: Array<string>
}) {
    return (
        <EuiFormRow label={label} isInvalid={isInvalid} error={error}>
            <EuiComboBox options={options} onChange={onChange} selectedOptions={selectedOptions} singleSelection={singleSelection} placeholder={placeholder} isClearable={isClearable} isInvalid={isInvalid} />

        </EuiFormRow>
    )
}

export default MeetingUserField