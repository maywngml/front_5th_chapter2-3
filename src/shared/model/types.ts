export type Method = "POST" | "GET" | "PUT" | "DELETE" | "PATCH"

export interface FetchApiParams {
  method: Method
  url: string
  body?: BodyInit | null | undefined
}

export interface FetchApiOptions {
  method: Method
  headers: HeadersInit | undefined
  body?: BodyInit | null | undefined
}
