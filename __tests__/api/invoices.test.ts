import { createMocks } from 'node-mocks-http'
import handler from '@/app/api/invoices/route'

describe('/api/invoices', () => {
  it('should require authentication', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(401)
  })
})
