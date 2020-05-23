/**
 * AuthToken is used for granting access into dominus and identifying the user
 *
 *
 * @example {
 *   "id": 82,
 *   "username": "oskkos",
 *   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJvc2trb3MiLCJpYXQiOjE1OTAyMjMxOTgsImV4cCI6MTU5MDMwOTU5OH0.tP-5h7NmH9aafoIKACrlkFZkLpY3slRRdJbTMk8jMHw"
 * }
 */
export interface AuthToken {
  /**
   * @isInt Integer
   */
  id: number;
  username: string;
  accessToken: string;
}

/**
 * AuthUser is used for authenticating into dominus
 *
 *
 * @example {
 *   "username": "oskkos",
 *   "password": "s3cret"
 * }
 */
export interface AuthUser {
  username: string;
  password: string;
}
