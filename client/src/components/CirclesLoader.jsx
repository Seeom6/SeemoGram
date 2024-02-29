import React from 'react'
import {CirclesWithBar} from "react-loader-spinner"

const CirclesLoader = ({width , height}) => {
  return (
    (<CirclesWithBar
        height={height}
        width={width}
        color="#4fa94d"
        outerCircleColor="#00a2f3"
        innerCircleColor="#00a2f3"
        barColor="#00a2f3"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />)
      
  )
}

export default CirclesLoader