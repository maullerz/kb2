/* eslint-disable */
/* Module not used currently */
import { useRef } from 'react'
import isEqual from 'lodash/isEqual'

function deepCompareEquals(a, b) {
  // TODO: implement deep comparison here
  // something like lodash
  return isEqual(a, b)
}

function useDeepCompareMemoize(value) {
  const ref = useRef()
  // it can be done by using useMemo as well
  // but useRef is rather cleaner and easier

  if (!deepCompareEquals(value, ref.current)) {
    ref.current = value
  }

  return ref.current
}

function useDeepCompareEffect(callback, dependencies) {
  useEffect(
    callback,
    dependencies.map(useDeepCompareMemoize),
  )
}

export default useDeepCompareEffect
