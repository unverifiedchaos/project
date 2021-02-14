import React, { Component } from 'react'
import * as queryString from 'query-string';

export default class OAuth extends Component {
    render() {
        const stringifiedParams = queryString.stringify({
            client_id: '481652291589-cl5mgaqo293ldhds5qoj9o7ip9ru82ko.apps.googleusercontent.com',
            redirect_uri: 'http://localhost:8080/',
            scope: [
              'https://www.googleapis.com/auth/userinfo.email',
              'https://www.googleapis.com/auth/userinfo.profile',
            ].join(' '), // space seperated string
            response_type: 'code',
            access_type: 'offline',
            prompt: 'consent',
          });
        const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
        return (
            <div>
                  <a href={googleLoginUrl}>
                    Login with Google
                </a>
            </div>
        )
    }
}
