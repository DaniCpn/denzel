import React, { Component } from 'react';

/*class Film extends React.Component {
    render() {
        return (
            <h1>Film Test</h1>
        );
    }
}
export default Film;

import React, { Component } from 'react';*/



class Film extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: [],
            isLoaded: false,
        }
    }
    componentDidMount() {
        fetch('http://localhost:3002/movie')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    item: json,
                })
            }

            )

    }
    render() {
        var { isLoaded, item } = this.state

        if (!isLoaded) {
            return <div>LOADDDDD</div>
        }
        else {
            return (
                <div>
                    {item.map(it => (<div>
                        Title : {it.title}
                    </div>
                    ))}
                </div>
            );
        }
    }
}

export default Film;