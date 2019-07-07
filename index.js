const _ = require('lodash')
const hp = require('hemera-plugin')
const { unifiedOrder } = require('@wongyouth/wxpay')

async function wxpay(hemera, opts) {
  let Joi = hemera.joi

  const params = {
    appid: Joi.string(),
    mch_id: Joi.string(),
    sub_appid: Joi.string(),
    sub_mch_id: Joi.string(),
    device_info: Joi.string(),
    nonce_str: Joi.string(),
    body: Joi.string().required(),
    detail: Joi.string(),
    attach: Joi.string(),
    fee_type: Joi.string(),
    total_fee: Joi.number().required(),
    spbill_create_ip: Joi.string().required(),
    time_start: Joi.string(),
    time_expire: Joi.string(),
    goods_tag: Joi.string(),
    trade_type: Joi.string(),
    limit_pay: Joi.string(),
    out_trade_no: Joi.string().required(),
    openid: Joi.string(),
    sub_openid: Joi.string(),
    receipt: Joi.string(),
    scene_info: Joi.string()
  }

  hemera.add(
    {
      topic: 'payment',
      cmd: 'unifiedorder',
      ...params
    },
    async function(req) {
      try {
        return await unifiedOrder(
          Object.assign(
            {},
            _.pick(opts, ['appid', 'mch_id', 'api_key', 'notify_url']),
            _.pick(req, Object.keys(params))
          )
        )
      } catch (err) {
        this.log.error(err)
        return { result: 'error', message: err.message }
      }
    }
  )

  hemera.log.info('service listening')
}

module.exports = hp(wxpay, {
  name: 'hemera-wxpay',
  hemera: '>=7.0.0',
  dependencies: ['hemera-joi'],
  options: {
    appid: process.env.WXPAY_APPID,
    mch_id: process.env.WXPAY_MCH_ID,
    api_key: process.env.WXPAY_API_KEY,
    notify_url: process.env.WXPAY_NOTIFY_URL
  }
})
