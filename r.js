console.time()
const flow = {
    id: 1,
    type: 'start',
    children: [{
        id: 2,
        type: 'block',
        children: [{
            id: 11,
            type: 'group',
            pchildren: [{
                id: 3,
                type: 'condition',
                children: [{
                    id: 4,
                    type: 'block',
                    children: []
                }]
            }, {
                id: 5,
                type: 'condition',
                children: [{
                    id: 12,
                    type: 'group',
                    children: [],
                    pchildren: [{
                            id: 6,
                            type: 'condition',
                            children: [{
                                id: 8,
                                type: 'block',
                                children: []
                            }]
                        },
                        {
                            id: 7,
                            type: 'condition',
                            children: []
                        }
                    ]
                }]
            }],
            children: [{
                id: 9,
                type: 'block',
                children: [{
                    id: 10,
                    type: 'end',
                    children: []
                }]
            }]
        }]
    }]
}
const groupBlockRelation = []
const blocksInsideGroups = {}
const groupsOfEachBlock = {}
const eachObject = {}
const rootObj = {
    ...flow
}
delete rootObj['children']
delete rootObj['pchildren']
eachObject[flow.id] = rootObj

const parentChildRelation = {}
parentChildRelation[flow.id] = null

flow.children.forEach(c => {
    parentChildRelation[c.id] = flow.id
    if (c.children.length > 0) {
        pcrecr(c.children, c.id)
    }
    if (c.pchildren) {
        if (c.pchildren.length > 0) {
            pcrecr(c.pchildren, c.id)
        }
        getBlocksUnderGroup(c.pchildren, c.id)
    }
    // eachObject
    const eo = {
        ...c
    }
    delete eo['children']
    delete eo['pchildren']
    eachObject[c.id] = eo
});

function pcrecr(details, parent) {
    details.forEach(q => {
        parentChildRelation[q.id] = parent
        if (q.children.length > 0) {
            pcrecr(q.children, q.id)
        }
        if (q.pchildren) {
            if (q.pchildren.length > 0) {
                pcrecr(q.pchildren, q.id)
            }
            getBlocksUnderGroup(q.pchildren, q.id)
        }
        // eachObject
        const eo = {
            ...q
        }
        delete eo['children']
        delete eo['pchildren']
        eachObject[q.id] = eo

    });
}

function getBlocksUnderGroup(data, groupId) {
    data.forEach(q => {
        groupBlockRelation.push({
            groupId: groupId,
            blockId: q.id
        })
        if (q.children) {
            if (q.children.length > 0) {
                getBlocksUnderGroup(q.children, groupId)
            }
        }
        if (q.pchildren) {
            if (q.pchildren.length > 0) {
                getBlocksUnderGroup(q.pchildren, groupId)
            }
        }
    });
}

groupBlockRelation.forEach(gb => {
    if (groupsOfEachBlock[gb.blockId]) {
        groupsOfEachBlock[gb.blockId] = [...groupsOfEachBlock[gb.blockId], gb.groupId]
    } else {
        groupsOfEachBlock[gb.blockId] = [gb.groupId]
    }

   if(eachObject[gb.blockId].type !== 'group'){
    if (blocksInsideGroups[gb.groupId]) {
        blocksInsideGroups[gb.groupId] = [...blocksInsideGroups[gb.groupId], gb.blockId]
    } else {
        blocksInsideGroups[gb.groupId] = [gb.blockId]
    }
   }
})

console.log('parentChildRelation', parentChildRelation);

const inverseRelationship = {}
const keys = Object.keys(parentChildRelation)
keys.forEach(ek => {
    if (parentChildRelation[ek] != null) {
        if (inverseRelationship[parentChildRelation[ek]]) {
            inverseRelationship[parentChildRelation[ek]] = [...inverseRelationship[parentChildRelation[ek]], ek]
        } else {
            inverseRelationship[parentChildRelation[ek]] = [ek]
        }
    }
});

console.log(inverseRelationship);
console.log(eachObject);
console.log("groupBlockRelation", groupBlockRelation);
console.log("blocksInsideGroups", blocksInsideGroups);
console.log("groupsOfEachBlock", groupsOfEachBlock);
console.timeEnd()