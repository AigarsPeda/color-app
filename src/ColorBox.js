import React, { Component } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'
import chroma from 'chroma-js'
import './ColorBox.css'

const styles = {
  ColorBox: {
    width: '20%',
    height: props => props.showingFullPalette ? '25%' : '50%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.5px',
    '&:hover button': {
      opacity: '1'
    }
  },
  CopyText: {
    color: props => chroma(props.background).luminance() >= 0.6 ? 'black' : 'white'
  },
  ColorName: {
    color: props => chroma(props.background).luminance() <= 0.09 ? 'white' : 'black'
  },
  SeeMore: {
    color: props => chroma(props.background).luminance() >= 0.6 ? 'black' : 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    border: 'none',
    right: '0px',
    bottom: '0px',
    width: '60px',
    height: '30px',
    textAlign: 'center',
    lineHeight: '30px',
    textTransform: 'uppercase',
  },
  CopyButton: {
    color: props => chroma(props.background).luminance() >= 0.6 ? 'black' : 'white',
    width: '100px',
    height: '30px',
    position: 'absolute',
    display: 'inline-block',
    top: '50%',
    left: '50%',
    marginLeft: '-50px',
    marginTop: '-15px',
    textAlign: 'center',
    outline: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    fontSize: '1rem',
    lineHeight: '30px',
    textTransform: 'uppercase',
    border: 'none',
    textDecoration: 'none',
    opacity: '0'
  }
}

class ColorBox extends Component {
  constructor(props) {
    super(props)
    this.state = { copied: false }
    this.changeCopyState = this.changeCopyState.bind(this)
  }
  changeCopyState() {
    this.setState({ copied:true }, () => {
      setTimeout(() => this.setState({copied: false}), 1600)
    })
  }
  render() {
    const { name, background, moreUrl, showingFullPalette, classes } = this.props
    const { copied } = this.state
    
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{backgroundColor: background}} className={classes.ColorBox}>
          <div style={{backgroundColor: background}} className={`copy-overlay ${copied && 'show'}`} />
          <div className={`copy-msg ${copied && 'show'}`} >
            <h1>Copied!</h1>
            <p className={classes.CopyText}>{this.props.background}</p>
          </div>
          <div className='copy-container'>
            <div className='box-content'>
              <span className={classes.ClassName}>{name}</span>
            </div>
            <button className={classes.CopyButton}>Copy</button>
          </div>
          { showingFullPalette && (
            <Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
              <span className={classes.SeeMore}>MORE</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    )
  }
}

export default  withStyles(styles)(ColorBox)