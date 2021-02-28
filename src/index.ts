import generator from 'megalodon'
import ccxt from 'ccxt'

const main = async () => {
  const BASE_URL: string = 'https://fedibird.com/'
  const access_token: string = '<アクセストークン>'

  const client = generator('mastodon', BASE_URL, access_token)

  const bitflyer = new ccxt.bitflyer()

  const intervalTime = 60 * 1000

  setInterval(async () => {
    const ticker = await bitflyer.fetchTicker('BTC/JPY')

    const cutedJpy = String(ticker.close).slice(0, -4)
    const t = new Date()
    const name = `${t.getHours()}時${t.getMinutes()}分${t.getSeconds()}秒の1BTCは${cutedJpy}万円`

    await client.updateCredentials({
      display_name: name,
    })
    console.log('かんりょ！')
  }, intervalTime)
}

main()
