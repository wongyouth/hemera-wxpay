# hemera-wxpay

hemera 插件

## 统一支付接口

### pattern

- topic: payment
- cmd: unifiedorder

其他参数与微信支付官网相同

## 环境变量

如果 appid 没有通过 hemera 传过来，则使用默认值，默认值从环境变量中获取。

```
    appid: process.env.WXPAY_APPID,
    mch_id: process.env.WXPAY_MCH_ID,
    api_key: process.env.WXPAY_API_KEY,
    notify_url: process.env.WXPAY_NOTIFY_URL
```