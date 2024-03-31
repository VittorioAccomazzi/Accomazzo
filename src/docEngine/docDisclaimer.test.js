const disc = require('./docDisclaimer');

describe('Validate regEx', () => {

    const fileNames=[
        {
            name :"Birth1800/20190707_210750.jpg",
            val : false
        },
        {
            name: "Birth1800/B4.jpg",
            val : true,
        },
        {
            name: "Birth1800/DSC_0059.jpg",
            val : true
        },
        {
            name: "Birth1800/b_1807_18.jpg",
            val : false
        },
        {
            name: "Birth1800/p_18860125.jpg",
            val :false
        },
        {
            name: "Birth1800/19220111.jpg",
            val :true
        },
        {
            name: "Birth1800/1778_2.jpg",
            val :true
        },
        {
            name: "Birth1800/Ancestry.jpg",
            val :false
        },
        {
            name: "Death/p_19490224.jpg",
            val :false
        },
        {
            name: "Death/gs_20190921_163542.jpg",
            val :false
        },
        {
            name: "Death/19050427.jpg",
            val :true
        },
        {
            name: "Marriage/M1700_84.jpg",
            val :true
        },
        {
            name: "Marriage/m_1808_18.jpg",
            val :false
        },
        {
            name: "Marriage/odp_186902.jpg",
            val :false
        },
        {
            name: "Marriage/p_19100126.jpg",
            val :false
        }
    ]

    fileNames.forEach( t=>{
        test( t.name, ()=>{
            expect( t.name.match(disc.regEx)!=null ).toEqual(t.val)
        })
    })


});
