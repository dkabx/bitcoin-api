import { DynamoItem } from '../interfaces';
import { BaseMapper } from '../models/base/BaseMapper';

export class GameService {
  async updateScore(email: string, score: number): Promise<DynamoItem> {
    try {
      if (!email || !score) {
        throw new Error('email and score are required');
      }
      const base = new BaseMapper();
      let addScore: DynamoItem = {
        email,
        score,
        pk: email,
        sk: new Date().getTime().toString(),
      };
      const existingItem: DynamoItem = await base.getItemByPk(email);

      if (existingItem) {
        addScore = existingItem;
        addScore.score = existingItem.score + score;
      }
      return await base.addItem(addScore);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getScore(email: string): Promise<DynamoItem> {
    try {
      if (!email) {
        throw new Error('email is required');
      }
      const base = new BaseMapper();

      return base.getItemByPk(email);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
