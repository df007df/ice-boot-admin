/* eslint no-confusing-arrow: 0 */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Authorized from './Authorized';

class AuthorizedRoute extends React.Component {
  render() {
    const {
      component: Component,
      componentProps: ComponentProps,
      render,
      authority,
      redirectPath,
      ...rest
    } = this.props;
    return (
      <Authorized
        authority={authority}
        noMatch={
          <Route
            {...rest}
            render={() => <Redirect to={{ pathname: redirectPath }} />}
          />
        }
      >
        <Route
          {...rest}
          render={(props) => {
             return Component ? <Component {...props} {...ComponentProps}/> : render(props)
            }
          }
        />
      </Authorized>
    );
  }
}

export default AuthorizedRoute;
