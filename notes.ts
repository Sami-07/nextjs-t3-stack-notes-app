/*
bcrypt does not unhash passwords.It again hashes the password entered by user and compares it with the hashed password in the database.

const [session, loading] = useSession();

how does next.js validates sessions?
next.js uses cookies to validate sessions and it is done by the use of a cookie called next-auth.session-token
this cookie is set by the next-auth library and it is used to validate the session on the server side and the client side as well 

the cookie is set to httpOnly which means that it cannot be accessed by javascript and it can only be accessed by the server side code

so, the cookie is decrypted by the library and the data is extracted from the cookie and the data is used to query the database and the data is validated.


token {
  name: 'samitest',
  email: 'sami@test.com',
  picture: null,
  sub: 'clrdk2erj0000o69msybk554u',
  id: 'clrdk2erj0000o69msybk554u',
  iat: 1705242435,
  exp: 1707834435,
  jti: '115538ca-4af1-4576-836d-f1eeacea0571'
}



- sub: This property represents the subject of the token, which typically refers to the user or entity that the token represents. In this case, the subject is set to 'clrdk2erj0000o69msybk554u'.

- id: This property represents the unique identifier associated with the token which is same as the sub. 
. In this case, the identifier is set to 'clrdk2erj0000o69msybk554u'.

- iat: This property represents the issued at time of the token, indicating when the token was created. The value is a timestamp, represented as a number. In this case, the issued at time is set to 1705242435.

- exp: This property represents the expiration time of the token, indicating when the token will no longer be valid. Similar to iat, the value is a timestamp. In this case, the expiration time is set to 1707834435.

- jti: This property represents the unique identifier for the token itself. It is often used for tracking and identifying tokens. In this case, the token identifier is set to '115538ca-4af1-4576-836d-f1eeacea0571'.

difference between sub and jti

sub is the unique identifier associated with the token which is same as the id
jti is the unique identifier for the token itself. It is often used for tracking and identifying tokens.

what is tRPC

tRPC is an alternative to REST and GraphQL APIs. It is a framework for building end-to-end typesafe APIs. It is built on top of Next.js and TypeScript and it is inspired by GraphQL and gRPC.


*/