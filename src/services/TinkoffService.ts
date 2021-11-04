// import OpenAPI from '@tinkoff/invest-openapi-js-sdk';
// import OpenAPI from '@tinkoff/invest-openapi-js-sdk';
import OpenAPI, { MarketInstrument } from '@tinkoff/invest-openapi-js-sdk';

// const ap iURL = 'https://api-invest.tinkoff.ru/openapi';
const sandboxApiURL = 'https://api-invest.tinkoff.ru/openapi/sandbox/';
const socketURL = 'wss://api-invest.tinkoff.ru/openapi/md/v1/md-openapi/ws';
const secretToken = process.env.TOKEN; // токен для боевого api
const sandboxToken = process.env.SANDBOX_TOKEN; // токен для сандбокса
const api = new OpenAPI({ apiURL: sandboxApiURL, secretToken: sandboxToken as string, socketURL });
// es-
// const OpenAPI = require('@tinkoff/invest-openapi-js-sdk');

// console.log(OpenAPI);

class TinkoffService {
    private apiURL = 'https://api-invest.tinkoff.ru/openapi';

    private socketURL = 'wss://api-invest.tinkoff.ru/openapi/md/v1/md-openapi/ws';

    private secretToken = 'xxx'; // токен для сандбокса

    public api: any;

    // constructor() {
    //   this.api = new OpenAPI(
    //     {
    //       apiURL: this.apiURL,
    //       secretToken: this.secretToken,
    //       socketURL: this.socketURL,
    //     },
    //   );
    // }

    public testbuy = async () => {
      await api.sandboxClear();

      const marketInstrument = await api.searchOne({ ticker: 'AAPL' }) as MarketInstrument;
      const { figi } = marketInstrument;
      console.log(await api.setCurrenciesBalance({ currency: 'USD', balance: 1000 })); // 1000$ на счет
      console.log(await api.portfolioCurrencies());
      console.log(await api.instrumentPortfolio({ figi })); // В портфеле ничего нет
      console.log(await api.limitOrder({
        operation: 'Buy', figi, lots: 1, price: 100,
      })); // Покупаем AAPL
      console.log(await api.instrumentPortfolio({ figi })); // Сделка прошла моментально
      console.log(await api.orderbookGet({ figi })); // получаем стакан по AAPL

      console.log(
        await api.candlesGet({
          from: '2019-08-19T18:38:33.131642+03:00',
          to: '2019-08-19T18:48:33.131642+03:00',
          figi,
          interval: '1min',
        }), // Получаем свечи за конкретный промежуток времени.
      );

      api.orderbook({ figi, depth: 10 }, (x) => {
        console.log(x.bids);
      });
      api.candle({ figi }, (x) => {
        console.log(x.h);
      });
    }
    // public testbuy = async () => {
    //   console.log('aaa');
    //   const data = await this.api.searchOne({ ticker: 'AAPL' });
    //   if (data?.figi) {
    //     const { figi } = data;
    //     const { commission, orderId } = await this.api.limitOrder({
    //       operation: 'Buy',
    //       figi,
    //       lots: 1,
    //       price: 100,
    //     }); // Покупаем AAPL
    //     console.log(commission); // Комиссия за сделку
    //     await this.api.cancelOrder({ orderId }); // Отменяем заявку
    //   }
    // }
}

export default new TinkoffService();
