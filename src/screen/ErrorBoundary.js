import React from 'react';
import * as Sentry from '@sentry/react-native';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  componentDidCatch(error, errorInfo) {
    this.setState({hasError: true});
    // Send error to Sentry
    Sentry.captureException(error, {extra: errorInfo});
  }

  render() {
    if (this.state.hasError) {
      return <Text>Something went wrong.</Text>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
