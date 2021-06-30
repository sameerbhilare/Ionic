/* eslint-disable no-underscore-dangle */
export class User {
  constructor(
    public id: string,
    public email: string,
    private _token: string,
    private tokenExpirationTime: Date
  ) {}

  get token() {
    if (!this.tokenExpirationTime || this.tokenExpirationTime <= new Date()) {
      // token expired
      return null;
    }
    return this._token;
  }
}
