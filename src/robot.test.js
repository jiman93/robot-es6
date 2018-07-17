import Robot from './robot'

/*
Example Input and Output
------------------------

### Example a
*/
const example1 = `
    PLACE 0,0,NORTH
    MOVE
    REPORT
`
/*
Expected output:

    0,1,NORTH

### Example b
*/
const example2 = `
    PLACE 0,0,NORTH
    LEFT
    REPORT
`
/*
Expected output:

    0,0,WEST

### Example c
*/
const example3 = `
    PLACE 1,2,EAST
    MOVE
    MOVE
    LEFT
    MOVE
    REPORT
`
/*
Expected output

    3,3,NORTH

*/

describe('Robot moves where it\'s told to move', () => {
    const rob = new Robot()
    it('should log out `0,1,NORTH` for example1', () => {
        spyOn(console, 'log')
        rob.do(example1)
        expect(console.log).toHaveBeenCalledWith('0,1,NORTH')
    })

    it('should log out `0,0,WEST` for example2', () => {
        spyOn(console, 'log')
        rob.do(example2)
        expect(console.log).toHaveBeenCalledWith('0,0,WEST')
    })

    it('should log out `3,3,NORTH` for example3', () => {
        spyOn(console, 'log')
        rob.do(example3)
        expect(console.log).toHaveBeenCalledWith('3,3,NORTH')
    })

    it('should log out `0,1,NORTH` for example3', () => {
        spyOn(console, 'log')
        rob.do(example3)
        rob.move()
        rob.move()
        // I am already at y = 5 so can't move further
        rob.move()
        rob.report()

        expect(console.log).toHaveBeenCalledWith('3,5,NORTH')
    })
})

describe('Robot logs and debug mode', () => {
    const rob = new Robot('', { debug: true })

    it('logs everything to the console in debug mode', () => {
        rob.debug = true
        spyOn(console, 'log')
        const testLogs = ['asd', '123', { a: 'a' }]
        rob.log(testLogs)
        expect(console.log).toHaveBeenCalledWith(testLogs)
    })
    it('logs nothing to the console when not in debug mode', () => {
        rob.debug = false
        spyOn(console, 'log')
        const testLogs = ['asd', '123', { a: 'a' }]
        rob.log(testLogs)
        expect(console.log).not.toHaveBeenCalledWith()
    })
})

describe('Robot turns in degrees', () => {
    const rob = new Robot('RIGHT', { debug: false })
    it('tells me the orientation in degrees when given a string', () => {
        rob.debug = true
        spyOn(console, 'log')
        rob.turn('RIGHT')
        expect(console.log).toHaveBeenCalledWith(`I turned RIGHT and am facing ${rob.legibleOrientation}`)
    })
})
