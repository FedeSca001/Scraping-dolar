import express from "express"
import * as cheerio from "cheerio"
import axios from "axios"
const PORT = process.env.PORT || 5000

const app = express()
const url = "https://www.cronista.com/MercadosOnline/dolar.html"

const selectorDolarCompra = "#market-scrll-2 > tbody > tr:nth-child(2) > td.buy > a > div > div.buy-value"
const selectorDolarVenta = "#market-scrll-2 > tbody > tr:nth-child(2) > td.sell > a > div > div.sell-value"
const selectorDolarBnaCompra = "#market-scrll-2 > tbody > tr:nth-child(1) > td.buy > a > div > div.buy-value"
const selectorDolarBnaVenta = "#market-scrll-2 > tbody > tr:nth-child(1) > td.sell > a > div > div.sell-value"    
const selectorDolarMepCompra = "#market-scrll-2 > tbody > tr:nth-child(6) > td.buy > a > div > div.buy-value"
const selectorDolarMepVenta = "#market-scrll-2 > tbody > tr:nth-child(6) > td.sell > a > div > div.sell-value"
const selectorDolarTurisata = "#market-scrll-2 > tbody > tr:nth-child(3) > td.sell > a > div > div.sell-value"

let cotizacion = {}

app.get("/", async (req,res)=>{
  try {
    const {data} = await axios.get(url)
    const $ = cheerio.load(data)
    cotizacion = {
      precioDolarBlueCompra: $(selectorDolarCompra).text(),
      precioDolarBlueVenta: $(selectorDolarVenta).text(),
      precioDolarBnaCompra: $(selectorDolarBnaCompra).text(),
      precioDolarBnaVenta: $(selectorDolarBnaVenta).text(),
      precioDolarMepCompra: $(selectorDolarMepCompra).text(),
      precioDolarMepVenta: $(selectorDolarMepVenta).text(),
      precioDolarTurista: $(selectorDolarTurisata).text(),
      fecha: new Date().toLocaleDateString()
    }
    res.json(cotizacion)
  } catch (error) {
    res.json({error})
  }
})
app.listen(PORT, ()=> console.log('Haciendo scraping'))