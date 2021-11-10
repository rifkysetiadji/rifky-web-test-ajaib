import React from 'react'
import { render,screen,fireEvent,createEvent } from '../../app/test-utils';
import User from './User'
import { configureStore } from '@reduxjs/toolkit';
import UserSlice from 'features/user/UserSlice';
import reducer, {initialState}  from 'features/user/UserSlice'
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
            d=all_dumm
            // console.log('from all')
        }
        if(gender){
            d=all_dumm.filter((d)=>{return d.gender==='female'})
        }
        if(keyword){
            d = all_dumm.filter(d=>{return d.name.first === 'Julia'})
            console.log('from keyword')
        }
        if(gender&&keyword){
            d = all_dumm.filter((d)=>{return d.gender==='female' &&d.name.first==='Julia'})
        }
      return res(
          ctx.json({
              info:{
                "seed": "c92fe7423aac049d",
                "results": 10,
                "page": 1,
                "version": "1.3"
              },
              results:d
          }), ctx.delay(150))
    })
  ]
const server = setupServer(...handlers)
let store;
// let utils=render(<User/>);
beforeEach(()=>{
    store = configureStore({
        reducer:{
            user : UserSlice
        }
    })
})
// beforeEach(()=>{
//     utils=render(<User/>)
// })
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// test("render page user",()=>{
//     render(<User/>)
//     expect(screen.getByTestId('user-container')).toBeTruthy()
// })
// describe("User Slice",()=>{
//     test("should return initial state on first run",()=>{
//         const nextState= initialState;

//         const result = reducer(undefined,{})

//         expect(result).toEqual(nextState)
//     })
//     test("should return row table from fetch",async ()=>{
//         render(<User/>)
//         expect(await screen.findByText(/Logan Novak/i)).toBeInTheDocument()
//     })
// })
describe("Component Search",()=>{
    

    // test("render field search",()=>{
    //     // let utils = render(<User/>)
    //     expect(utils.getByTestId('field-search')).toBeTruthy()
    // })
    test("search by type field search",async ()=>{
        let utils=render(<User/>)
        let field = utils.getByTestId('field-search')
        let btn = utils.getByTestId('btn-search')
        fireEvent.change(field,{target : {value : 'Julia'}})
        fireEvent.click(btn)
        // screen.debug()
        
        expect(await utils.findByText(/Julia/i)).toBeInTheDocument()
        expect(await utils.queryByText(/Logan/i)).not.toBeInTheDocument()

    })
})

// describe("Component filter gender",()=>{
//     test("render field gender",()=>{
//         render(<User/>)
//         expect(screen.getByTestId('field-gender')).toBeTruthy()
//     })
//     test("search by gender",async ()=>{
//         let utils = render(<User/>)
//         let field = utils.getByTestId('field-gender')
//         fireEvent.change(field,{target : {value : 'female'}})
//         expect(await utils.findByText(/female/i)).toBeInTheDocument()
//     })
// })

// describe("Component pagination",()=>{
//     test("render pagination",()=>{
//         render(<User/>)
//         expect(screen.getByTestId('pagination')).toBeTruthy()
//     })
//     test("move page",()=>{
//         let utils = render(<User/>)
//         let pagination = utils.getByTestId('pagination')
//         const event= createEvent.change(pagination,{page:{value:2}})
//         fireEvent(pagination,event)
//     })
// })