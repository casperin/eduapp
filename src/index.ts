import * as superfine from 'superfine'

export const h = superfine.h

export type State = {
    [key: string]: any
}

export type View = (state: State) => any

export function app(originalState: State, view: View, container: Element): State {
    let node: any
    let timeout: number | undefined
    let newState: State | undefined
    let state: State = {}

    for (const key in originalState) {
        Object.defineProperty(state, key, {
            set: value => {
                originalState[key] = value
                clearTimeout(timeout)
                timeout = setTimeout(patch, 0)
            },
            get: () => originalState[key]
        })
    }

    patch()

    function patch() {
        node = superfine.patch(node, view(state), container)
    }

    return state
}

function extend(a: State, b: State): State {
    var out: State = {}
    for (var k in a) out[k] = a[k]
    for (var k in b) out[k] = b[k]
    return out
}

function shallowCompare(state: State, newState: State): boolean {
    for (var k in newState) {
        if (newState[k] !== state[k]) {
            return true
        }
    }
    return false
}
