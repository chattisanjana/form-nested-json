const d = [{
    id: 1,
    parent: null
}, {
    id: 2,
    parent: 1
}, {
    id: 3,
    parent: 2
}]

const tree = []

function recr(items) {
    const map = {}
    let roots = []
    items.forEach(e => {
        e.children = []
        e.pchildren = []
        map[e.id] = e
    });

    for (let i = 0; i < items.length; ++i) {
        const parent = items[i].parent;
        console.log(parent, map);
        const nodes = (parent == null) ? roots : (map[parent] ? map[parent].children : []);
        console.log("78787878787", items[i]);
        nodes.push(items[i]);
    }
    return roots
}

console.log(JSON.stringify(recr(d)));

