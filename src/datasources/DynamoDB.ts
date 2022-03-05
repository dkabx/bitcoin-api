// @flow

import * as AWS from 'aws-sdk';

const dynamoDBClientVar = new AWS.DynamoDB.DocumentClient();
const dynamoDBClient = dynamoDBClientVar;
export { dynamoDBClient };
