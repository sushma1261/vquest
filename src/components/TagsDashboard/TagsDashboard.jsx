import React from 'react';
import { Header, Icon, Segment, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase/firebase';
const ListItem = ({tag}) => {
    return (
        <List.Item style = {{textAlign: "left"}}>
                <Link to = {
                    {
                        pathname: '/tags/' + tag,
                        props: {
                            tag: tag
                        }
                    }
                }>
                    <Icon name="long arrow alternate right" /><span style = {{fontSize: "20px"}}>{tag}</span>
                </Link>
        </List.Item>
    );
} 


class TagsDashboard extends React.Component {
    state = {
        tags: []
    }
    componentDidMount() {
        // this.getTagsFormDB()
    }

    getTagsFormDB = async() => {
        var tags = []
        var ref = firebase.database().ref("tags").orderByChild("name");
        await ref.once("value")
        .then(function(snapshot){
            snapshot.forEach(function(child){
                tags.push({"name":child.val().name})
            })
            
        })
        console.log(tags)
        this.setState({tags});
    }
    render() {
        return (
            <Segment.Group>
                <Segment>
                    <Header as="h3"> Tags</Header>
                </Segment>
                <Segment>
                    <List>
                        {this.state.tags.map(({name}, idx) => 
                                <ListItem tag = {name} key = {idx}/>
                        )}
                    </List>

                </Segment>
            </Segment.Group>
        );
    }
}

export default TagsDashboard;