import type { AWS } from '@serverless/typescript';

import { updateScore, getScore } from '@functions/game';

const serverlessConfiguration: AWS = {
  service: 'ep-api',
  frameworkVersion: '2',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    region: 'eu-central-1',
    runtime: 'nodejs14.x',
    stage: "${opt:stage, 'dev'}",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      // restApiId: 'ep-api-gateway',
      // restApiRootResourceId: 'ep-api-gateway-root',
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    lambdaHashingVersion: '20201221',
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:DescribeTable',
              'dynamodb:Query',
              'dynamodb:Scan',
              'dynamodb:GetItem',
              'dynamodb:PutItem',
              'dynamodb:UpdateItem',
              'dynamodb:DeleteItem',
            ],
            Resource: 'arn:aws:dynamodb:eu-central-1:*:table/EPUsers',
          },
        ],
      },
    },
  },
  resources: {
    Resources: {
      EPUsersTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'EPUsers',
          AttributeDefinitions: [
            {
              AttributeName: 'pk',
              AttributeType: 'S',
            },
            {
              AttributeName: 'sk',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'pk',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'sk',
              KeyType: 'RANGE',
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
      // Authorizer: {
      //   Type: 'AWS::ApiGateway::Authorizer',
      //   Properties: {
      //     IdentitySource: 'method.request.header.authorization',
      //     Name: 'CognitoAuthorizer',
      //     ProviderARNs: ["${opt:cognito-arn, ''}"],
      //     Type: 'COGNITO_USER_POOLS',
      //     RestApiId: 'ep-api-gateway',
      //   },
      // },
    },
  },
  // import the function via paths
  functions: { updateScore, getScore },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
