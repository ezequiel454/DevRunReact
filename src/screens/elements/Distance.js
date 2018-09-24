import React from 'react'

const Distance = ({ distance, metric }) => {
  let distanceStr = ''
  if(metric==='metric'){
      distanceStr = distance.toFixed(2) + ' km'
  }else {
      // 1 km = 0,621371mi
      const distanceMi = distance * 0.621371
      distanceStr = distanceMi.toFixed(2) + ' mi'
  }
  return <span>{distanceStr}</span>
}

export default Distance