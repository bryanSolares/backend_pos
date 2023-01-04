const app = require('../../app')

const token =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnZW5lcmljbyIsIm5hbWUiOiJCcnlhbiBKb3N1w6kiLCJsYXN0bmFtZSI6IlNvbGFyZXMiLCJlbWFpbCI6InNvbGFyZXMuam9zdWVAb3V0bG9vay5jb20iLCJpYXQiOjE2NzI4MTA3OTksImV4cCI6MTY3MjgxNDM5OX0.G91DF2laIw6FsimTTrUjTvH8DyzKpbbmon46QP7bF1JnNrwkD3oP5PcXd86rDB9tELswSrz5JRBPFlRod7P-soj_EdO9KV-z-PjoFpeYpRmHU1dklAkreYpiae_bgNn7PIWB8w8H39ywvj-t8kx-qqJd-ty8LkbOQyuo54BkMq4GYXMJbIaUBRtCZ6wWIAqILhBcmAW-8Ea7WjjBiw_GWRvPWLQnobjgfFoYgKN4ZpqE9I5B1qluymedu2WHpaPWIng_u4tpK5f-Igd-99Ofw-1-lXz_Szmes2YGsRuJJl22LSbi21ZuXQiPTmyN3P9qm01EmE6t60t8tnzlQzibQvXgnhMceDP4CuqQeykSC_JXB88Yo-Lgf991NNfPaybuzGeJ-RCurvxJoLl0UmkH9bHmlCHinRt5P75MwxilBmrYZK0EmPUG5qjP04iQr8Xni1E9g2eKAbGuu4WkN0VOWeIBEbsEiHpVA6JiTY00PhD_3yC8AU4riRp89KVtIG8eY_q0YjMVmQQ01SBc11IgDPJRGIgVH9MRFxDYD8H7eMzi4gZGqy8Luz_CUYf77ERzLCseVl3oCnwUjYS0U4UGPaMd3how2BHU76kJV7IqKZLmRPDwBsMq3J5sfLBvknke3ON5TBjnUrPpPkn59buKZfs5eXEu61bBLSnSWsGvMOs'

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
