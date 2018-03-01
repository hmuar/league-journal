/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

import React, { Component } from 'react';
import { Auth, I18n, Logger } from 'aws-amplify';

import {
  FormSection,
  SectionHeader,
  SectionBody,
  SectionFooter,
  InputRow,
  ButtonRow,
  Link,
  AuthPiece,
} from 'aws-amplify-react';

const logger = new Logger('ConfirmSignIn');

export default class ConfirmSignIn extends AuthPiece {
  constructor(props) {
    super(props);

    this._validAuthStates = ['confirmSignIn'];
    this.confirm = this.confirm.bind(this);
  }

  confirm() {
    const user = this.props.authData;
    const { code } = this.inputs;
    Auth.confirmSignIn(user, code)
      .then(() => this.changeState('signedIn'))
      .catch((err) => this.error(err));
  }

  showComponent(theme) {
    const { hide } = this.props;
    if (hide && hide.includes(ConfirmSignIn)) {
      return null;
    }

    return (
      <FormSection theme={theme}>
        <SectionHeader theme={theme}>{I18n.get('Confirm Code')}</SectionHeader>
        <SectionBody theme={theme}>
          <InputRow
            autoFocus
            placeholder={I18n.get('Code')}
            theme={theme}
            key="code"
            name="code"
            onChange={this.handleInputChange}
          />
          <ButtonRow theme={theme} onClick={this.confirm}>
            {I18n.get('Confirm')}
          </ButtonRow>
        </SectionBody>
        <SectionFooter theme={theme}>
          <Link theme={theme} onClick={() => this.changeState('signIn')}>
            {I18n.get('Back to Sign In')}
          </Link>
        </SectionFooter>
      </FormSection>
    );
  }
}
