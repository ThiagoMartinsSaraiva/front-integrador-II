import { promises as fs } from 'fs'
import { revalidateTag } from 'next/cache'

export async function GET() {
  const file = await fs.readFile(process.cwd() + '/app/db.json', 'utf-8')
  const object = JSON.parse(file)

  return await Response.json(object)
}

export async function POST(request: Request) {
  const data = await request.json()
  fs.writeFile(process.cwd() + '/app/db.json', JSON.stringify(data))

  revalidateTag('get-global')

  return new Response(JSON.stringify({ message: 'ok' }), {
    headers: {
      'Content-Type': 'application/json'
    },
    status: 200,
  })
}