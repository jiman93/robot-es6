/* eslint-disable no-console */
import Utils from './utils'

export default class Robot {
    constructor(commands, { debug = false } = {}) {
        this.commands = commands
        this.position = {
            x: 0,
            y: 0,
        }
        this.size = Utils.config.size
        this.orientation = 0
        this.debug = debug
        this.parseCommands()
    }

    /**
     * I return the direction in which I am facing
     *
     * @readonly
     * @memberof Robot
     */
    get legibleOrientation() {
        return Utils.getLegibleOrientation(this.orientation)
    }

    // I'm just a utility function to log out my actions
    log() {
        if (this.debug) {
            console.log(...arguments)
        }
    }

    /**
     * Your wish is my command(s)
     *
     * @param {String} commands
     * @memberof Robot
     */
    do(commands) {
        this.commands = commands
        this.parseCommands()
    }

    parseCommands() {
        this.commands && this.commands.split('\n').map((line) => {
            const lineArray = line.trim().split(' ')
            switch (lineArray[0]) {
                case 'PLACE':
                    this.place(...lineArray[1].split(','))
                    return true
                case 'LEFT':
                    this.turn('LEFT')
                    break
                case 'RIGHT':
                    this.turn('RIGHT')
                    break
                case 'MOVE':
                    this.move()
                    break
                case 'REPORT':
                    this.report()
                    break
                default:
                    return false
            }
        })
        return false
    }

    /**
     * I simple place myself where I'm told and face the direction you want me to
     *
     * @param {Number} position
     * @param {String} legibleOrientation
     * @memberof Robot
     */
    place(x, y, legibleOrientation) {
        this.position.x = Number(x)
        this.position.y = Number(y)
        this.orientation = Utils.getOrientation(legibleOrientation)
        this.log(`You placed me at ${x},${y},${legibleOrientation}`)
    }

    /**
     * I move myself 1 step in the direction I'm facing
     *
     * @memberof Robot
     */
    move() {
        this.position = Utils.directionMap[this.orientation].move(this.position)
        this.log(`I moved and now at x: ${this.position.x} y: ${this.position.y}`)
    }

    /**
     * I turn to my left or right and face either `NORTH`, `SOUTH`, `EAST`, `WEST`
     *
     * @param {String} direction
     * @memberof Robot
     */
    turn(direction) {
        this.orientation = Utils.turn(direction, this.orientation)
        this.log(`I turned ${direction} and am facing ${this.legibleOrientation}`)
    }

    /**
     *
     * @memberof Robot
     */
    report() {
        const report = `${this.position.x},${this.position.y},${Utils.getLegibleOrientation(this.orientation)}`
        console.log(report)
        return report
    }
}
