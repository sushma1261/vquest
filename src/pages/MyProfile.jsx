import React from 'react'
import { Image, Table, Grid, Segment ,Icon} from 'semantic-ui-react'

const MyProfile = () => (
  <Segment style={{backgroundColor: "#b5e6e1"}}>
                    <Grid width = {5}>
                        <Grid.Row  floated = "left" > 
                            <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTkDzS2j8tsVVAraS8BbBZnUcLuTZmNr2xOSeXLU43AbjXsZ02q" size='small' circular centered/>
                        </Grid.Row>
                        <Grid.Row> 
                            <Table basic='very'>
                              <Table.Header>
                                <Table.Row>
                                  <Table.HeaderCell textAlign='center' >      
                                  <h3><Icon disabled name='users' size ="large"/>
                                        username</h3>
                                  </Table.HeaderCell>
                                  <Table.HeaderCell textAlign='left'><h3>sushma </h3></Table.HeaderCell>
                                </Table.Row>
                              </Table.Header>

                              <Table.Body>
                                <Table.Row>
                                  <Table.Cell textAlign='center'>
                                  <h3><Icon disabled name='mail' size ="large"/>
                                        email</h3>
                                        
                                  
                                  </Table.Cell>
                                  <Table.Cell textAlign='left'><h3>sushmavarma@gmail.com</h3></Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                  <Table.Cell textAlign='center'>
                                  <h3><Icon disabled name='registered outline' size ="large"/>
                                  Regd.No</h3>
                                        
                                  
                                  </Table.Cell>
                                  <Table.Cell textAlign='left'><h3>16B01A12A2</h3></Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                  <Table.Cell textAlign='center'>
                                  <h3><Icon disabled name='arrow right' size ="large"/>
                                      Score</h3>
                                        
                                  
                                  </Table.Cell>
                                  <Table.Cell textAlign='left'><h3>1000</h3></Table.Cell>
                                </Table.Row>
                              </Table.Body>
                            </Table>
            </Grid.Row>
          </Grid>
          </Segment>
)

export default MyProfile