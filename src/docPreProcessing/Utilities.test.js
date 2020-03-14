const Utilities = require('./Utilities')
const docDefs = require('../docEngine/docDefs') 

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

  const testNames = [
    {
        name : 'John',
        num : 20
    },
    {
        name : 'Paul',
        num : 5
    },
    {
        name : 'Baul',
        num : 1
    },
    {
        name : 'Pau1',
        num :1
    }
  ]

  const testFixes = [
      {
          src : 'Baul',
          dst : 'Paul'
      }
  ]

  describe('Fixes', ()=>{
    test( "Simple Fix Table", ()=>{
        expect( Utilities.Fixes(testNames, ["Pau1"]) ).toEqual(testFixes)
    })
    test( "Simple Fix List", ()=>{
        Utilities.Fixes(testNames, ["Pau1"]) ;
        expect( testNames ).toEqual(expect.not.arrayContaining([{
            name : 'Baul',
            num : 1
        }]))
    })
})

const testListInp = [
    {
        name : 'John,',
        family : 'Accomazzo'
    },
    {
        name : 'Paul',
        family : 'Accomazzi 122'
    },
    {
        name : 'Paul. 32',
        family : 'Bernulli'
    }
  ]

  const testListRes = [
    {
        name : "BERNULLI",
        num :1
    },  
    {
          name : "JOHN",
          num :1
      },
      {
          name : "PAUL",
          num : 2
      }
  ]

describe('Extract',()=>{
    test('Simple Extract test', ()=>{
        expect(
            Utilities.Extract(testListInp,["name","family"],docDefs.AccoKey).sort((a,b)=>( a.name > b.name ? 1: -1))
        ).toEqual(testListRes)
    })
})

const testListFixesInp = [
    {
        name : 'John,',
        family : 'Accomazzo'
    },
    {
        name : 'Paul',
        family : 'Accomazzi 122'
    },
    {
        name : 'Paul. 32',
        family : 'Bernulli'
    },
    {
        name :'pauli 22',
        family : 'Barna'
    }
  ]

const testListFixesRes = [
    {
        name : 'John,',
        family : 'Accomazzo'
    },
    {
        name : 'Paolo',
        family : 'Accomazzi 122'
    },
    {
        name : 'Paolo. 32',
        family : 'Bernulli'
    },
    {
        name :'pauli 22',
        family : 'Barna'
    }
  ]

const testFixList =[
    {
        src : 'paul',
        dst : 'Paolo'
    }
]
describe('Replace',()=>{
    test('Simple Replace',()=>{
        expect(Utilities.Replace(testListFixesInp,["name", "family"],testFixList)).toEqual([testListFixesRes,2])
    })
})

const testCapInp =[
    {
        name : 'poul, 124',
        family : "AccomazzO"
    },
    {
        name : 'PeteR 22',
        family : 'biri'
    }
]

const testCapRes =[
    {
        name : 'Poul, 124',
        family : "Accomazzo"
    },
    {
        name : 'Peter 22',
        family : 'Biri'
    }
]
describe('Capitalize',()=>{
    test('Simple Capitalize',()=>{
        expect(Utilities.Capitalize(testCapInp,["name", "family"])).toEqual(testCapRes)
    })
})
