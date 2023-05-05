import { Strategy, Context } from 'unleash-client'

class TimeStampStrategy extends Strategy {
  constructor() {
    super('TimeStamp');
  }

  isEnabled(parameters: any, context: Context) {
    return Date.parse(parameters.enableAfter) < Date.now();
  }
}