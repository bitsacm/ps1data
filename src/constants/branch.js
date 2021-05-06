const branches = {
    Any: 'gray',
    AA: 'orange',
    AB: 'orange',
    A1: 'yellow',
    A2: 'pink',
    A3: 'purple',
    A4: 'orange',
    A5: 'red',
    A7: 'teal',
    A8: 'green',
    B1: 'yellow',
    B2: 'yellow',
    B3: 'yellow',
    B4: 'pink',
    B5: 'cyan',
    C6: 'yellow'
}

export const branchOpts = Object.keys(branches).map((key) => {
    return {
        value: key,
        label: key,
        color: branches[key],
        selected: true
    }
})

export default branches