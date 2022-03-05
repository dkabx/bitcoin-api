import { get } from 'lodash';

import { DynamoItem } from '../../interfaces';
import { dynamoDBClient } from '../../datasources/DynamoDB';

const TableName = 'EPUsers';
export class BaseMapper {
  async addItem(item: DynamoItem): Promise<DynamoItem> {
    try {
      const params = {
        TableName,
        Item: item,
      };

      console.log(`#########Item ${JSON.stringify(item)}`);
      console.log(`########params${JSON.stringify(params)}`);

      const data = await dynamoDBClient.put(params).promise();
      console.log(`AddItem Data ${JSON.stringify(data)}`);
      return item;
    } catch (err) {
      console.log(`Error: ${err}`);
      throw new Error(err);
    }
  }

  async getItemByPk(pk: string): Promise<DynamoItem> {
    try {
      const params = {
        TableName,
        KeyConditionExpression: 'pk = :pk',
        ExpressionAttributeValues: {
          ':pk': pk,
        },
      };

      const data = await dynamoDBClient.query(params).promise();
      console.log(`data: ${data}`);
      return get(data, 'Items[0]');
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
}
