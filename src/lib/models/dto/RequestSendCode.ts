interface ReqeustSendCode extends ReqeustWithEmail {
  purpose: 'SIGN_UP' | 'RESET_PASSWORD';
}
