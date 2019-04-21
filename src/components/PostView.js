import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AsyncSeriesHook } from 'tapable'
import './PostView.css'

class PostView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      post: {}
    }
    this.createMarkup = this.createMarkup.bind()
  }

  componentDidMount () {
    console.log('inside component did mount')
    const slug = this.props.match.params.slug
    console.log('got the slug')
    console.log(slug)
    axios
      .get(`http://www.objectivetalent.com/blog/wp-json/wp/v2/posts?slug=${slug}`)
      .then(post => {
        console.log(post)
        this.setState({
          post: post.data[0]
        })
      })
  }

  createMarkup (html) {
    return { __html: html }
  }

  render () {
    let build
    if (this.state.post.title) {
      build = (
        <div>
          <h1 className='col-md-8 col-md-offset-3 centered' dangerouslySetInnerHTML={this.createMarkup(this.state.post.title.rendered)} />
          <div className='col-md-4 col-md-offset-4 centered' dangerouslySetInnerHTML={this.createMarkup(
            this.state.post.content.rendered
          )}
          />
        </div>
      )
    } else {
      build = <div />
    }
    return build
  }
}

export default PostView
