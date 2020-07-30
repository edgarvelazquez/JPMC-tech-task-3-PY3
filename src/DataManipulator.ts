import { ServerRespond } from './DataStreamer';

//added values to show dessired graph analysis
export interface Row {
    price_abc: number,
    price_def: number,
    ratio: number,
    timestamp: Date,
    upper_bound: number,
    lower_bound: number,
    trigger_alert: number | undefined,
}

//modified values to react to numerical changes specifically the upper bound and lower bound trigger
export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row {
      const priceABC = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) / 2;
      const priceDEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) / 2;
      const ratio = priceABC / priceDEF;
      const upperBound = 1 + 0.01; //this numbers can vary according to user, but 0.02 allows to see a clearer trigger alert on given data
      const lowerBound = 1 - 0.01;
      return {
          price_abc: priceABC,
          price_def: priceDEF,
          ratio,
          timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ?
              serverRespond[0].timestamp : serverRespond[1].timestamp,
          upper_bound: upperBound,
          lower_bound: lowerBound,
          trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
      };
    
  }
}
