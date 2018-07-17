// change command here
import Robot from './robot'

const command = `
    PLACE 1,2,EAST
    MOVE
    MOVE
    LEFT
    MOVE
    REPORT
`
const robot = new Robot(command)

robot.report()

