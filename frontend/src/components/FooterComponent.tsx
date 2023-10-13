import React, { Component } from 'react'

export default class FooterComponent extends Component {
  public constructor(props: any) {
    super(props);
    this.state = {
    
    }
  }

  public render(): JSX.Element {
    return (
      <div className='footer'>
          Updated up to 2023!
      </div>
    )
  }
}
