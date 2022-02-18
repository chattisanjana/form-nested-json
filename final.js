const data = [{
    id: 1,
    parent: null,
    type: 'start'
}, {
    id: 2,
    parent: 1,
    type: 'block'
}, {
    id: 3,
    parent: 8,
    type: 'condition'
}, {
    id: 4,
    parent: 8,
    type: 'condition'
}, {
    id: 5,
    parent: 4,
    type: 'block'
}, {
    id: 6,
    parent: 8,
    type: 'block'
}, {
    id: 7,
    parent: 6,
    type: 'end'
}, {
    id: 8,
    parent: 2,
    type: 'group'
}]

const map = {}
const reverseMap = {}
const typeMap = {}
let root = null
data.forEach(q => {
    map[q.parent] = q.id
    reverseMap[q.id] = q.parent
    typeMap[q.id] = q.type
    if (q.type == 'start') {
        root = q.id
    }
});

console.log(root, map, reverseMap, typeMap);


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

console.log(JSON.stringify(recr(data)));