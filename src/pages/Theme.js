import React, { Component } from 'react'
import styled from '@emotion/styled'
import { UpdaterContext } from '../updater';
import PageLayout from '../components/PageLayout';
import ReactMarkdown from 'react-markdown'
import { getMarketplaceResource, getAvailableThemes, installTheme } from '../utils/theme';

const ReadmeWrapper = styled.div`
    width:100%;
    img{
        max-width:100%;
    }
`
const Header = styled.header`
    
    border-bottom:3px solid black;
    padding-bottom:2em;
    .grid{
        display: grid;
        grid-template-columns:1fr 4fr;
        grid-column-gap:2em;
    }
    img{
        max-width:100%;
    }
    .name{
        display: flex;
        align-items: center;
        h1{
            margin:0;
        }
        pre{
            margin-left:2em;
            padding:10px;
            border-radius:5px;
            background: #aaa;
        }
    }
    h3{
        margin:0;
        margin-top: .5em;
    }
    ul{
        display: block;
        width:50%;
        margin:auto;
        li{
            display: flex;
            justify-content: space-between;
            margin:10px 0;
            align-items: center;
        }
    }
    .install{
        
        background: green;
        color:white;
        padding:10px;
        border: none;
        outline:none;
        cursor:pointer;
    }
    h4{
        text-align: center;
    }
`
export default class extends Component {
    static contextType = UpdaterContext
  constructor(props) {
    super(props);
    this.state = {
        readme: '# Loading...',
        themes: []
    }
    this.fetchReadme()
    this.getThemes()
  }
  componentDidUpdate = (prevProps, prevState) => {
    if(prevProps.location.state.ext.extensionId !== this.props.location.state.ext.extensionId){
        this.setState({
            readme: '# Loading',
            themes: []
        })
        this.fetchReadme()
        this.getThemes()
    }
  }
  fetchReadme = () => {
    getMarketplaceResource(this.props.location.state.ext, 'readme', true).then(readme => {
        this.setState({
            readme
        })
    })
  }
  getThemes = () => {
    getAvailableThemes(this.props.location.state.ext).then(themes => {
        console.log('themes', themes)
        this.setState({
            themes
        })
    })
  }
  installTheme = (theme) => {
        installTheme(theme)
  }
  render() {
    const { ext } = this.props.location.state
    console.log(ext)
    return (
      
            <PageLayout>
                <Header>
                    <div className="grid">
                    <img src={ext.versions[0].files[0].source} />
                    <div>
                        <div className="name">
                        <h1>{ext.displayName}</h1>
                        <pre>{ext.extensionName}</pre>
                        </div>
                        <h3 className="author">{ext.publisher.displayName}</h3>
                        <p className="desc">{ext.shortDescription}</p>
                    </div>
                    </div>
                    <div className="themes">
                    <h4>{this.state.themes.length > 0 ? 'Available themes:' : 'No available themes'}</h4>
                    <ul>
                        {
                            this.state.themes.map(theme => (
                                <li>
                                <span>{theme.label}</span>
                                <button className="install" onClick={e => this.installTheme(theme)}>Use theme</button>
                                </li>
                            ))
                        }
                    </ul>
                    </div>
                </Header>
        
        <ReadmeWrapper>
        <ReactMarkdown source={this.state.readme} />
        </ReadmeWrapper>
        </PageLayout>
       
    );
  }
}