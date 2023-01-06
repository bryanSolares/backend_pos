const app = require('../../app')

const token =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnZW5lcmljbyIsIm5hbWUiOiJCcnlhbiBKb3N1w6kiLCJsYXN0bmFtZSI6IlNvbGFyZXMiLCJlbWFpbCI6InNvbGFyZXMuam9zdWVAb3V0bG9vay5jb20iLCJpYXQiOjE2NzI5NzQxNDF9.A_E1R-496T9ftUbPqSgiE7PiWNdpsC8D9gRKapyIOAUKb8MrR2_5Lnan9ESh_ueke_gQ2-_u-Wlh4UinK9RMUU5NHrolhuuwHjuTfyvNFOZ8z2UNCpqmWsKS0haWHXpUmZDYl4ZyYiUBS9-YMmDGFp4RGHCcGSNb12oANsewNz9vvslGWqN6_rZHvURpKd00ioXQsmDQYHkzYNmql-UubTQxl3GwJ7W5w6g7RMVdAOXfKuJ4ZDJin2rbln845sF35GgsLfjPAY5k1wIJXEV6oTs187aqK4YR5zzwHsHl8PtNWx3WmQhU6rMKwAfRVCRabfH82EZgzwJPP5cU9lA9B3VJqFwvaVnf_ykPvlYBRQJ21ckseQw-FXc6rwut4tgjA3OPGe89Dv1AH7D7CMHmnc9s0XS94yVc8-KOMaHJrH_fGGALL865-hA3Y1v4TC0bXsJJC19Ds1aiABOkcg_wW4umRSNb9kxdo7N3j9X72_f5gS4GkXyeNfh_Rmmds0C4cjacMIPGtO8pI6KCTOHroQO1lC7kSexGzVZvm7-6u2Lkg18q38E0OSScbK7hILkTMeilsqfEQE4To-duOwE7lzNyxnHn5XcuFCoyEGYrjQQ-aijb6KpYSYwbDpSkpFG86KKP5seH7MVgiQ_U-Z31fHOaT77wwHJG4mJ2tmjTYbM'

const createMookData = () => {}

const deleteMookData = () => {}

beforeAll(async () => {
  await app.listen()
})

afterAll(async () => {
  await app.stop()
})

module.exports = {
  app: app.app,
  server: app.server,
  data: {
    token
  }
}
