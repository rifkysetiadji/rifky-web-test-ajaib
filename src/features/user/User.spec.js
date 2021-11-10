import React from 'react'
import { render,screen,fireEvent,waitFor } from '../../app/test-utils';
import User from './User'
import { configureStore,conversionSlice } from '@reduxjs/toolkit';
import UserSlice from 'features/user/UserSlice';
import reducer, {initialState,fetchUser}  from 'features/user/UserSlice'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
let dumm=[
    {
        "gender": "female",
        "name": {
            "title": "Ms",
            "first": "Mabel",
            "last": "Foster"
        },
        "location": {
            "street": {
                "number": 5657,
                "name": "Crockett St"
            },
            "city": "Fort Worth",
            "state": "Minnesota",
            "country": "United States",
            "postcode": 86018,
            "coordinates": {
                "latitude": "84.1931",
                "longitude": "10.1776"
            },
            "timezone": {
                "offset": "-2:00",
                "description": "Mid-Atlantic"
            }
        },
        "email": "mabel.foster@example.com",
        "login": {
            "uuid": "a4e69257-d9d7-4f0e-8481-57b082d252d0",
            "username": "beautifulgoose512",
            "password": "kcj9wx5n",
            "salt": "J2B7b6Iq",
            "md5": "62b218116ea59c7e0df2bbe129de3d5c",
            "sha1": "6ddbda966ccbca6f77af6f57ed009280ba659139",
            "sha256": "7519da339e514bdf5ce9478c87e108384d907f70628d7912250a806fc8b08fb7"
        },
        "dob": {
            "date": "1983-06-30T07:24:31.435Z",
            "age": 38
        },
        "registered": {
            "date": "2002-09-16T16:38:55.997Z",
            "age": 19
        },
        "phone": "(181)-318-0933",
        "cell": "(989)-316-1997",
        "id": {
            "name": "SSN",
            "value": "056-64-1481"
        },
        "picture": {
            "large": "https://randomuser.me/api/portraits/women/49.jpg",
            "medium": "https://randomuser.me/api/portraits/med/women/49.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/women/49.jpg"
        },
        "nat": "US"
    }
]
export const handlers = [
    rest.get('https://randomuser.me/api/', (req, res, ctx) => {
        // const query = req.url.searchParams
        // query.get("page")
        // query.get("results")

      return res(
          ctx.json({
          info:{
            page: 1,
            results: 10,
            seed: "d9e004342c83d8d7",
            version: "1.3",
          },
          results:dumm
      }), ctx.delay(150))
    })
  ]
const server = setupServer(...handlers)
let store;
beforeEach(()=>{
    store = configureStore({
        reducer:{
            user : UserSlice
        }
    })
})
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test("render page user",()=>{
    render(<User/>)
    expect(screen.getByTestId('user-container')).toBeTruthy()
})
describe("User Slice",()=>{
    test("should return initial state on first run",()=>{
        const nextState= initialState;

        const result = reducer(undefined,{})

        expect(result).toEqual(nextState)
    })
    test("should return row table from fetch",async ()=>{
        render(<User/>)
        expect(await screen.findByText(/Mabel Foster/i)).toBeInTheDocument()
    })
})
describe("Component Search",()=>{
    test("render field seach",()=>{
        render(<User/>)
        // let wrapperEl= component.getByTestId('field-search')
        expect(screen.getByTestId('field-search')).toBeTruthy()
    })
})
