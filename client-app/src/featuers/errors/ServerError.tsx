import React from 'react'
import { Container, Header, Segment } from 'semantic-ui-react'
import { UseStore } from '../../App/store/store'

const ServerError = () => {
    const {commonStore}=UseStore();
    return (
       <Container>
        <Header as={'h1'} content={'Server Error'}/>
        <Header sub as={'h5'}  content={commonStore.error?.message}/>
        <Segment>
            <Header as={'h2'} content={"Stack Trace"} color='teal'/>
            <code style={{marginTop:'10px'}}>
                {commonStore.error?.details}
            </code>
        </Segment>
       </Container>
    )
}

export default ServerError