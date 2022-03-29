const Express = require('express')
const Axios = require('axios')
const app = Express();

const router = Express.Router();
router.get('/', async (req,res) => {
  let weatherData;
  try {
   const response = await Axios.get('http://www.bom.gov.au/fwo/IDN60801/IDN60801.95765.json')
    weatherData = response.data.observations.data

  } catch (e) {
    return res.status(503).json({"error": "Error Connecting to BOM."})
  }
  try {
    const filteredData = weatherData.filter((record) => record.apparent_t > 20)
    const sortedData = filteredData.sort((a,b) => a.apparent_t - b.apparent_t)
    const fieldData = sortedData.map((record) => {
      return {
        name: record.name,
        apparent_t: record.apparent_t,
        lat: record.lat,
        long: record.lon,
      }
    })
    return res.json(fieldData)
  } catch (e) {
    return res.status(500).json({"error": "Server Error."})
  }
})
app.use('/', router)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
