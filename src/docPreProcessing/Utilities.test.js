const Utilities = require('./Utilities')

let tests =[
    {
        name : "normal case",
        inp  : "one, two, three",
        res  : ["one"," two"," three"]
    },
    {
        name : "normal case",
        inp  : "one and one,two ,three",
        res  : ["one and one","two ","three"]
    },
    {
        name : "empty",
        inp  : ",,",
        res  : ["","",""]
    },
    {
        name : "one comma",
        inp  : "a,\"b,c\",d,e",
        res  : ["a","b,c","d","e"]
    },
    {
        name : "two commas",
        inp  : "\"a,b,\",\"c,d\",",
        res  : ["a,b,","c,d",""]
    },
    {
        name : "double double quotes",
        inp  : "\"\"\"hello\"\"\",1,2,",
        res  : ["\"hello\"","1","2",""]
    },
    {
        name : "double quotes in middle",
        inp  : "\"hello\"\" and \",hello,,",
        res  : ["hello\" and ","hello","",""]
    },
    {
        name : "single double quotes",
        inp  : "\"aa\"\"\",\"b,\",c,",
        res  : ["aa\"","b,","c",""]  
    },
    {
        name : "single  quotes",
        inp  : "ab',\"cc,d'\",,",
        res  : ["ab'","cc,d'","",""]  
    }
]


describe('SplitCsv', () => {
    tests.forEach((t)=>{
        test(t.name, () => {
            expect(
                Utilities.SlitCsv(t.inp)
            ).toEqual(t.res)
        });
    })
  });