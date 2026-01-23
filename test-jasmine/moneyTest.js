import {formatCurrency} from '../scripts/utils/money.js';

describe('test suite: formatCurrency',()=>{
  it('converts cents into Dollars',()=>{
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('round upto nearest cents',()=>{
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });
  
  it('works with 0',()=>{
    expect(formatCurrency(0)).toEqual('0.00');
  })

});

