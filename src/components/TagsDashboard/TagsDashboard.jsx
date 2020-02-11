import React from 'react';
import { Header, Icon, Segment, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class TagsDashboard extends React.Component {
    render() {
        return (
            <Segment.Group>
                <Segment>
                    <Header as="h3"> Tags</Header>
                </Segment>
                <Segment>
                    <List>
                        <List.Item>
                            <span><Link to = {
                                {
                                    pathname: '/tags/' + 'C',
                                    props: {
                                        tag: 'C'
                                    }
                                }
                            }>C
                            </Link></span>
                        </List.Item>
                        <List.Item>
                            <span><Link to = {
                                {
                                    pathname: '/tags/' + 'C++',
                                    props: {
                                        tag: 'C++'
                                    }
                                }
                            }>C++
                            </Link></span>
                        </List.Item>
                        <List.Item><Icon name="long arrow alternate right" />Java</List.Item>
                        <List.Item><Icon name="long arrow alternate right" />ML</List.Item>
                    </List>

                </Segment>
            </Segment.Group>
        );
    }
}

export default TagsDashboard;