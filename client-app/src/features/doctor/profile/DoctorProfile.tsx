import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Button, Confirm, Grid, Header, Image, Segment } from 'semantic-ui-react';
import PhotoUploadWidget from '../../../app/common/imageUpload/PhotoUploadWidget';
import Breadcrumbs from '../../../app/layout/Breadcrumbs';
import { useStore } from '../../../app/stores/store';
import DoctorProfileDetails from './DoctorProfileDetails';
import EditProfile from './EditProfile';

export default observer(function DoctorProfile() {
    const { userStore: { user }, profileStore: { loadDoctor, selectedDoctor: doctor, uploadPhoto, deletePhoto }, modalStore } = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState('');
    const [openConfirm, setOpenConfirm] = useState(false);

    function handlePhotoUpload(file: Blob) {
        uploadPhoto(file).then(() => setAddPhotoMode(false));
    }

    useEffect(() => {
        loadDoctor(user?.id!);
    }, [user])

    return (
        <>
            <Segment.Group>
                <Segment>
                    <Breadcrumbs />
                </Segment>
                <Segment>
                    <Header as='h1' content='My Profile' />
                </Segment>
            </Segment.Group>
            <Segment>
                <Grid>
                    <Grid.Column width='3' textAlign='center'>
                        <Image src={doctor?.image || '/assets/user.png'} circular size='small' centered />
                        <br />
                        {!addPhotoMode ?
                            <>
                                <Button basic
                                    content={doctor?.image ? 'Edit Photo' : 'Add Photo'}
                                    onClick={() => setAddPhotoMode(true)}
                                />
                                <Button
                                    basic
                                    color='red'
                                    icon='trash'
                                    onClick={() => setOpenConfirm(true)}
                                />
                            </>
                            : <Button basic
                                content='Cancel'
                                onClick={() => setAddPhotoMode(false)}
                            />
                        }
                    </Grid.Column>
                    {addPhotoMode ?
                        <Grid.Column width='13'>
                            <PhotoUploadWidget
                                uploadPhoto={handlePhotoUpload} />
                        </Grid.Column>
                        :
                        <>
                            <Grid.Column width='12'>
                                <DoctorProfileDetails doctor={doctor!} />
                            </Grid.Column>
                            <Grid.Column width='1'>
                                <Button icon='edit' basic onClick={() => modalStore.openModal(<EditProfile doctor={doctor!} />)} />
                            </Grid.Column></>}
                </Grid>
                <Confirm
                    open={openConfirm}
                    header='Delete photo'
                    content='This action cannot be undone. Are you sure?'
                    cancelButton='Cancel'
                    confirmButton="Delete"
                    onCancel={() => setOpenConfirm(false)}
                    onConfirm={() => deletePhoto((doctor!.image!.split("/")[7]).split(".")[0]).then(() => setOpenConfirm(false))}
                />
            </Segment>
        </>
    )
})