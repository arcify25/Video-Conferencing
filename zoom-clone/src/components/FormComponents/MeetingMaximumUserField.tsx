import React from 'react'
import { EuiForm, EuiFormRow, EuiFieldNumber } from '@elastic/eui'

export default function MeetingMaximumUserField({ value, setValue }: {
    value: number, setValue: React.Dispatch<React.SetStateAction<number>>;
}) {
    return (
        <EuiFormRow label="Maximum People">
            <EuiFieldNumber placeholder='Maximum People' min={1} max={150} value={value} onChange={e => {
                if (!e.target.value.length || +e.target.value.length === 0) setValue(1)
                else if (+e.target.value > 150) setValue(150)
                else setValue(+e.target.value)
            }} />
        </EuiFormRow>
    )
}
