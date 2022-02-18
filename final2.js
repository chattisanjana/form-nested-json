const data = [{
        id: 1,
        parent: null,
        type: 'start'
    }, {
        id: 2,
        parent: 1,
        type: 'block'
    }, {
        id: 11,
        parent: 2,
        type: 'group'
    }, {
        id: 9,
        parent: 11,
        type: 'block'
    }, {
        id: 10,
        parent: 9,
        type: 'end'
    },
    {
        id: 3,
        parent: 11,
        type: 'condition'
    },
    {
        id: 5,
        parent: 11,
        type: 'condition'
    },
    {
        id: 4,
        parent: 3,
        type: 'block'
    },
    {
        id: 12,
        parent: 5,
        type: 'group'
    },
    {
        id: 6,
        parent: 12,
        type: 'condition'
    },
    {
        id: 7,
        parent: 12,
        type: 'condition'
    },
    {
        id: 8,
        parent: 6,
        type: 'block'
    }
]


// const map = {}
// const reverseMap = {}
const typeMap = {}
// let root = null
data.forEach(q => {
    // map[q.parent] = q.id
    // reverseMap[q.id] = q.parent
    typeMap[q.id] = q.type
    // if (q.type == 'start') {
    //     root = q.id
    // }
});

// console.log(root, map, reverseMap, typeMap);


function recr(items) {
    const map = {}
    let roots = []
    items.forEach(e => {
        e.children = []
        e.pchildren = []
        map[e.id] = e
    });

    for (let i = 0; i < items.length; ++i) {
        const {
            parent
        } = items[i];
        console.log(parent, map);
        if (typeMap[parent] == 'group') {
            const nodes = (parent == null) ? roots : (map[parent] ? map[parent].pchildren : []);
            const pdata1 = items[i]
            pdata1['pchildren'] = items[i].pchildren.filter(e => e.type == 'condition')
            pdata1['children'] = items[i].children.filter(e => e.type != 'condition')
            nodes.push(pdata1);
        }
        const nodes = (parent == null) ? roots : (map[parent] ? map[parent].children : []);
        const pdata2 = items[i]
        pdata2['pchildren'] = items[i].pchildren.filter(e => e.type == 'condition')
        pdata2['children'] = items[i].children.filter(e => e.type != 'condition')
        nodes.push(pdata2);

    }
    return roots
}

const unrefinedData = recr(data)
console.log(unrefinedData, JSON.stringify(unrefinedData));

function refineData(urdata) {
    urdata.forEach(ee => {
        ee.children = ee.children.filter(e => e.type != 'condition')
        ee.pchildren = ee.pchildren.filter(e => e.type == 'condition')
        if (ee.children.length > 0) {
            refineData(ee.children)
        }
        if (ee.pchildren.length > 0) {
            refineData(ee.pchildren)
        }
    });
}
refineData(unrefinedData)
const refinedData = unrefinedData
console.log("refinedData", JSON.stringify(refinedData));