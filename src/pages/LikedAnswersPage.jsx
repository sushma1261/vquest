import React from 'react';
import LikedAnswersList from '../components/LikedAnswers/LikedAnswersList';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class LikedAnswersPage extends React.Component {
    render() {
        return(
            <div>
                <Link to = {{
                    pathname: "/dummy",
                    props: {name: "Sushma"}
                    }}> 
                    Click Here!!!
                </Link>
                <LikedAnswersList />
            </div>
        );
    }
}

export default LikedAnswersPage;