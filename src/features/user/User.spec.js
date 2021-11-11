import React from 'react'
import { render,screen,fireEvent,createEvent } from '../../app/test-utils';
import User from './User'
import App from 'App';
import { configureStore } from '@reduxjs/toolkit';
import UserSlice from 'features/user/UserSlice';
import reducer, {fetchUser}  from 'features/user/UserSlice'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
let all_dumm=[
    {
        "gender": "male",
        "name": {
            "title": "Mr",
            "first": "Logan",
            "last": "Novak"
        },
        "location": {
            "street": {
                "number": 4047,
                "name": "3rd St"
            },
            "city": "Lafontaine",
            "state": "Nunavut",
            "country": "Canada",
            "postcode": "P0N 6S6",
            "coordinates": {
                "latitude": "-59.5960",
                "longitude": "-17.2007"
            },
            "timezone": {
                "offset": "+9:30",
                "description": "Adelaide, Darwin"
            }
        },
        "email": "logan.novak@example.com",
        "login": {
            "uuid": "8be61894-5dc3-4dd0-bc2d-ccfea6446779",
            "username": "blueswan813",
            "password": "scully",
            "salt": "vZYpY2am",
            "md5": "46124766b85f585b953756efc48bb3f6",
            "sha1": "cf953dbdf7ba6a7f79f10818b6dd8b517c797060",
            "sha256": "a52153b2a8deda92a173f422178d4ee88e601fb0329573640428c84b4ac0c082"
        },
        "dob": {
            "date": "1985-12-02T15:43:13.311Z",
            "age": 36
        },
        "registered": {
            "date": "2019-01-28T10:10:29.891Z",
            "age": 2
        },
        "phone": "632-244-4621",
        "cell": "547-981-2599",
        "id": {
            "name": "",
            "value": null
        },
        "picture": {
            "large": "https://randomuser.me/api/portraits/men/88.jpg",
            "medium": "https://randomuser.me/api/portraits/med/men/88.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/men/88.jpg"
        },
        "nat": "CA"
    },
    {
        "gender": "female",
        "name": {
            "title": "Miss",
            "first": "Julia",
            "last": "Justi"
        },
        "location": {
            "street": {
                "number": 7374,
                "name": "Tehtaankatu"
            },
            "city": "Puolanka",
            "state": "Kainuu",
            "country": "Finland",
            "postcode": 82576,
            "coordinates": {
                "latitude": "-80.3391",
                "longitude": "72.1046"
            },
            "timezone": {
                "offset": "+9:30",
                "description": "Adelaide, Darwin"
            }
        },
        "email": "julia.justi@example.com",
        "login": {
            "uuid": "07065521-7fd3-48be-870b-75ca41a77dc3",
            "username": "tinymouse364",
            "password": "lightnin",
            "salt": "4y0vKatB",
            "md5": "d5ab78ddfd7b024ee480f8b7ed927bae",
            "sha1": "6d2a9ab8e883f8f55d7896caa0e451f5054b85df",
            "sha256": "13b5fd6347584efc60618240a07fdce7e8b3964744601cc4ef99d6771125114f"
        },
        "dob": {
            "date": "1954-12-15T15:37:08.582Z",
            "age": 67
        },
        "registered": {
            "date": "2015-01-20T11:04:57.843Z",
            "age": 6
        },
        "phone": "07-025-402",
        "cell": "047-445-39-33",
        "id": {
            "name": "HETU",
            "value": "NaNNA868undefined"
        },
        "picture": {
            "large": "https://randomuser.me/api/portraits/women/4.jpg",
            "medium": "https://randomuser.me/api/portraits/med/women/4.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/women/4.jpg"
        },
        "nat": "FI"
    },
]

export const handlers = [
    rest.get('https://randomuser.me/api/', (req, res, ctx) => {
        const query = req.url.searchParams
        let page= query.get("page")
        let results= query.get("results")
        let keyword = query.get('keyword')
        let gender = query.get('all')
        let d=[]
        if(!gender&&!keyword){
            return res(
                ctx.json({
                    info:{
                      "seed": "c92fe7423aac049d",
                      "results": 10,
                      "page": 1,
                      "version": "1.3"
                    },
                    results:all_dumm
                }),ctx.delay(150))
        }
        if(gender){
            return res(
                ctx.json({
                    info:{
                      "seed": "c92fe7423aac049d",
                      "results": 10,
                      "page": 1,
                      "version": "1.3"
                    },
                    results:[all_dumm[0]]
                }))
        }
        if(keyword){
            return res(
                ctx.json({
                    info:{
                      "seed": "c92fe7423aac049d",
                      "results": 10,
                      "page": 1,
                      "version": "1.3"
                    },
                    results:[all_dumm[1]]
                }))
        }
        if(gender&&keyword){
            return res(
                ctx.json({
                    info:{
                      "seed": "c92fe7423aac049d",
                      "results": 10,
                      "page": 1,
                      "version": "1.3"
                    },
                    results:[all_dumm[0]]
                }))
        }
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

beforeEach(()=>{
    render(<User/>)
})

const initialState={
    users:[],
    status:'idle'
}
test("Test status jadi loading ketika request",async ()=>{
    const action = {type: fetchUser.pending};
    const actual= reducer(initialState,action)
    expect(actual.status).toEqual("loading")
})
test("Test fetch user set payload ke users dan tampil ke table",async ()=>{
    // render(<User/>)
    const action = {type: fetchUser.fulfilled,payload:{
        info:{
            "seed": "c92fe7423aac049d",
            "results": 10,
            "page": 1,
            "version": "1.3"
          },
          results:all_dumm
    }};
    const actual= reducer(initialState,action)
    expect(actual.users.length).toEqual(2)
    expect(actual.status).toEqual('idle')
    expect(await screen.findByText(/Logan/i)).toBeInTheDocument()
    expect(await screen.findByText(/Julia/i)).toBeInTheDocument()
})

test("search",async ()=>{
    // let utils = render(<User/>)
    let field =  screen.getByTestId('field-search')
    let btn =  screen.getByTestId('btn-search')
    fireEvent.change(field,{target : {value : 'Julia'}})
    fireEvent.click(btn)
    const action = {type: fetchUser.fulfilled,payload:{
        info:{
            "seed": "c92fe7423aac049d",
            "results": 10,
            "page": 1,
            "version": "1.3"
          },
          results:[all_dumm[1]]
    }};
    const actual= reducer(initialState,action)
    expect(actual.users.length).toEqual(1)
    expect(await (await screen.findAllByText(/Julia/i)).length).toBe(1)
    expect(await (await screen.queryAllByText(/Logan/i)).length).toBe(0)
})

test("filter by gender",async ()=>{
    let field = screen.getByTestId('field-gender')
    fireEvent.change(field,{target : {value : 'male'}})
    const action = {type: fetchUser.fulfilled,payload:{
        info:{
            "seed": "c92fe7423aac049d",
            "results": 10,
            "page": 1,
            "version": "1.3"
          },
          results:[all_dumm[0]]
    }};
    const actual= reducer(initialState,action)
    expect(actual.users).toEqual([
        all_dumm[0]
    ])
})