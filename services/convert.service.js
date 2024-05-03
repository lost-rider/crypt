


const convertService = catchAsync(async (req, res) => {
    const { fromCurrency, toCurrency,date } = req.query;
    const coin1list=await fetch("https://api.coingecko.com/api/v3/coins/${fromCurrency}/history?date=${date}")
    const res1=await coin1list.json();
    const p1=res1['current_price']['usd'];
    const coin2list=await fetch("https://api.coingecko.com/api/v3/coins/${toCurrency}/history?date=${date}")
    const res2=await coin2list.json();
    const p2=res1['current_price']['usd'];
    const result=p2/p1;


    res.status(httpStatus.OK).json(result);
  });

  export default convertService;