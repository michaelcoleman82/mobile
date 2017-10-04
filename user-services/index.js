
const {Iot, STS} = require('aws-sdk')

const iot = new Iot()
const sts = new STS()

exports.getKeys = (e, c, cb) =>
  sts.getCallerIdentity({}).promise()
  .then( ({Account}) =>
    sts.assumeRole({
      RoleArn: `arn:aws:iam::${Account}:role/get-keys`,
      RoleSessionName: '' + Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
    }).promise())
  .then( ({Credentials:{AccessKeyId, SecretAccessKey, SessionToken}})  =>
    iot.describeEndpoint({}).promise()
    .then( ({endpointAddress}) =>
      cb(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          host: endpointAddress,
          accessKeyId: AccessKeyId,
          secretKey: SecretAccessKey,
          sessionToken: SessionToken
        })
    })
  ))
  .catch( err => cb(null, err))
