import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Image, Button, Divider, Grid } from 'semantic-ui-react';
import LoginForm from '../../features/users/LoginForm';
import RegisterForm from '../../features/users/RegisterForm';
import { useStore } from '../stores/store';

export default observer(function HomePage() {
    const { userStore } = useStore();
    const { user } = userStore;
    const [register, setRegister] = useState(false);

    function handleRegisterForm(state: boolean) {
        setRegister(!state);
    }

    return (
        <>
            <Segment textAlign='center' style={{ margin: '0 0 50px 0' }}>
                <Header as='h2'>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
                    MEDCARE HOSPITAL
                </Header>
            </Segment>
            <Segment textAlign='center' vertical>
                <Container text style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {userStore.isLoggedIn ? (
                        <Segment style={{ backgroundColor: 'white' }}>
                            <Header as='h3' content={'You are already logged in'} />
                            <Button as={Link} to={`/${user?.role.toLowerCase()}`} size='huge' primary >
                                Continue!
                            </Button>
                        </Segment>
                    ) : (
                        !register &&
                        <>
                            <Segment>
                                <Grid >
                                    <Grid.Column width='6' style={{ padding: 0 }}>
                                        <Image src='/assets/doctor.png' />
                                    </Grid.Column>
                                    <Grid.Column width='10' style={{ padding: '0 60px' }}>
                                        <div style={{ margin: '50px 0' }}>
                                            <Header content='Sign in' as='h2' />
                                            <Header
                                                content='Sign in to continue to your account'
                                                as='h4'
                                                style={{ padding: 0, margin: 0 }}
                                                color='grey'
                                            />
                                        </div>
                                        <LoginForm />
                                        <Divider style={{ margin: '40px 0' }} />
                                        Don't have an account?
                                        <br />
                                        <Button content='Sign up' basic onClick={() => setRegister(true)} />
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                        </>
                        || register &&
                        <>
                            <Segment style={{ minWidth: '30vw', padding: '0 20px' }}>
                                <Grid >
                                    <Grid.Column width='16'>
                                        <div style={{ margin: '50px 0' }}>
                                            <Header content='Sign up' as='h2' />
                                            <Header
                                                content='Create your account to benefit from our online services'
                                                as='h4'
                                                style={{ padding: 0, margin: 0 }}
                                                color='grey'
                                            />
                                        </div>
                                        <RegisterForm />
                                        <Divider style={{ margin: '40px 0' }} />
                                        Already have an account?
                                        <br />
                                        <Button content='Sign in' basic onClick={() => setRegister(false)} style={{ marginBottom: '10px' }} />
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                        </>
                    )}

                </Container>
            </Segment>
        </>
    )
})