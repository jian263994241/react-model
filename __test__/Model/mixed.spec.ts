/// <reference path="../index.d.ts" />
import { testHook } from 'react-hooks-testing-library'
import { Counter } from '..'
import { Model } from '../../src'

describe('useStore', () => {
  test('create by single model definition', async () => {
    let state: any
    let actions: any
    let count = 0
    const Home = Model(Counter)
    const { useStore, subscribe, unsubscribe } = Model({ Home })
    testHook(() => {
      ;[state, actions] = useStore('Home')
    })
    expect(state).toEqual({ count: 0 })
    await actions.increment(3)
    expect(state).toEqual({ count: 3 })
    // test subscribe
    subscribe('Home', 'increment', () => (count += 1))
    await actions.increment(4)
    expect(count).toBe(1)
    expect(state.count).toBe(7)
    // test unsubscribe
    unsubscribe('Home', 'increment')
    await actions.increment(3)
    expect(state.count).toBe(10)
    expect(count).toBe(1)
  })
})