import React, { useEffect } from 'react'
import { MeetingType } from '../util/Types';
import useAuth from '../hooks/useAuth';
import useFetchUsers from '../hooks/useFetchUsers';
import useToast from '../hooks/useToast';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { UserType } from '../util/Types';
import { useState } from 'react';
import { FieldErrorType } from '../util/Types';
import { updateDoc, doc } from 'firebase/firestore';
import moment from 'moment';
import { firebaseDB } from '../util/FireBaseConfig';
import CreateMeetingButtons from "./FormComponents/CreateMeetingButtons";
import useFetchUser from "../hooks/useFetchUsers";
import MeetingDateField from "./FormComponents/MeetingDateField";
import MeetingMaximumUsersField from "./FormComponents/MeetingMaximumUserField";
import MeetingNameField from "./FormComponents/MeetingNameField";
import MeetingUserField from "./FormComponents/MeetingUsersField";

import {
    EuiFlyout,
    EuiFlyoutBody,
    EuiFlyoutHeader,
    EuiForm,
    EuiFormRow,
    EuiSpacer,
    EuiSwitch,
    EuiTitle,
} from "@elastic/eui";

export default function EditFlyout({ closeFlyout, meetings }: {
    closeFlyout: any;
    meetings: MeetingType;
}) {
    useAuth();
    const [users] = useFetchUsers();
    const [createToast] = useToast();
    const [status, setStatus] = useState(false);

    const uid = useAppSelector((zoomApp) => zoomApp.auth.userInfo?.uid);
    const navigate = useNavigate();

    const [meetingName, setMeetingName] = useState(meetings.meetingName);
    const [selectedUser, setSelectedUser] = useState<Array<UserType>>([]);
    const [startDate, setStartDate] = useState(moment(meetings.meetingDate));
    const [size, setsize] = useState(1);
    const [meetingType] = useState(meetings.meetingType);
    const [showErrors] = useState<{
        meetingName: FieldErrorType;
        meetingUsers: FieldErrorType;
    }>({
        meetingName: {
            show: false,
            message: [],
        },
        meetingUsers: {
            show: false,
            message: [],
        },
    });
    const [anyoneCanJoin, setAnyoneCanJoin] = useState(false);


    useEffect(() => {
        if (users) {
            const foundUsers: Array<UserType> = [];
            meetings.invitedUsers.forEach((userId: string) => {
                const findUser = users.find(
                    (tempUser: UserType) => tempUser.uid === userId
                );
                if (findUser) foundUsers.push(findUser);
            })
        }
    }, [meetings, users]);

    const onUserChange = (selectedOptions: Array<UserType>) => {
        setSelectedUser(selectedOptions);
    };

    // const validateForm = () => {
    //     const showErrorsClone = { ...showErrors };
    //     let errors = false;
    //     if (!meetingName.length) {
    //         showErrorsClone.meetingName.show = true;
    //         showErrorsClone.meetingName.message = ["Please Enter Meeting Name"];
    //         errors = true;
    //     } else {
    //         showErrorsClone.meetingName.show = false;
    //         showErrorsClone.meetingName.message = [];
    //     }
    //     if (!selectedUser.length && !anyoneCanJoin) {
    //         showErrorsClone.meetingUsers.show = true;
    //         showErrorsClone.meetingUsers.message = ["Please Select a User"];
    //         errors = true;
    //     } else {
    //         showErrorsClone.meetingUsers.show = false;
    //         showErrorsClone.meetingUsers.message = [];
    //     }
    //     setShowErrors(showErrorsClone);
    //     return errors;
    // };


    const editMeeting = async () => {
        const editedMeeting = {
            ...meetings,
            meetingName,
            meetingType,
            invitedUsers: selectedUser.map((user: UserType) => user.uid),
            maxUsers: size,
            meetingDate: startDate.format("L"),
            status: !status,
        };
        delete editedMeeting.docId;
        const docRef = doc(firebaseDB, "meetings", meetings.docId!);
        await updateDoc(docRef, editedMeeting);
        createToast({
            title: "Meeting Updated Successfully",
            type: "success",
        });
        closeFlyout(true);


    }



    return (
        <EuiFlyout ownFocus onClose={() => closeFlyout()}>
            <EuiFlyoutHeader hasBorder>
                <EuiTitle size="m">
                    <h2>{meetings.meetingName}</h2>
                </EuiTitle>
            </EuiFlyoutHeader>
            <EuiFlyoutBody>
                <EuiForm>
                    <MeetingNameField
                        label="Meeting name"
                        isInvalid={showErrors.meetingName.show}
                        error={showErrors.meetingName.message}
                        placeholder="Meeting name"
                        value={meetingName}
                        setMeetingName={setMeetingName}
                    />
                    {meetingType === "anyone-can-join" ? (
                        <MeetingMaximumUsersField value={size} setValue={setsize} />
                    ) : (
                        <MeetingUserField
                            label="Invite Users"
                            isInvalid={showErrors.meetingUsers.show}
                            error={showErrors.meetingUsers.message}
                            options={users}
                            onChange={onUserChange}
                            selectedOptions={selectedUser}
                            singleSelection={
                                meetingType === "1-on-1" ? { asPlainText: true } : false
                            }
                            isClearable={false}
                            placeholder="Select a Users"
                        />
                    )}
                    <MeetingDateField selected={startDate} setStartDate={setStartDate} />
                    <EuiFormRow display="columnCompressedSwitch" label="Cancel Meeting">
                        <EuiSwitch
                            showLabel={false}
                            label="Cancel Meeting"
                            checked={status}
                            onChange={(e) => setStatus(e.target.checked)}
                        />
                    </EuiFormRow>
                    <EuiSpacer />
                    <CreateMeetingButtons
                        createMeeting={editMeeting}
                        isEdit={false}
                        closeFlyout={closeFlyout}
                    />
                </EuiForm>
            </EuiFlyoutBody>
        </EuiFlyout>
    );
}
