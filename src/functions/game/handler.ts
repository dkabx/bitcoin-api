import { get } from 'lodash';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { GameService } from '../../services/GameService';
import schema from './schema';

const updateScoreHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const gameService = new GameService();
  const data = await gameService.updateScore(get(event, 'body.email'), get(event, 'body.score'));
  return formatJSONResponse({
    data,
  });
};

const getScoreHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const gameService = new GameService();

  const data = await gameService.getScore(get(event, 'body.email'));
  return formatJSONResponse({
    data,
  });
};

export const updateScore = middyfy(updateScoreHandler);
export const getScore = middyfy(getScoreHandler);
