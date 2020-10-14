import React, {Component} from 'react';

interface IHOC {}

const withLoader = (WrappedComponent: any) => {
  return class LoaderComponent extends Component {
    constructor(props: any) {
      super(props);
      this.state = {};
    }
    render() {
      return (
        <WrappedComponent name='lisi' />
      )
    }
  }
}

export default withLoader;

